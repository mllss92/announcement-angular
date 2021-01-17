import { Component, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, pluck, tap } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import { PaginationData } from './../../shared/models/pagination-data';
import { Post } from './../../shared/models/post';
import { PostsService } from './../../shared/services/posts.service';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements AfterViewInit, OnDestroy {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef;

  postsList!: Post[];

  search$!: Subscription;

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
  ) { }

  ngAfterViewInit(): void {
    this.getPostsUsingPagination();
    this.addSearchEvent();
  }

  ngOnDestroy(): void {
    if (this.search$) {
      this.search$.unsubscribe();
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getPostsUsingPagination(data: PaginationData = { pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize }): void {
    this.postsService.getPostsUsingPagination(data).subscribe(
      res => {
        if (typeof res !== 'boolean') {
          this.paginator.length = res.length;
          this.postsList = res.postsList;
        }
      }
    );
  }

  getPostByKeywords(data: PaginationData, keyword: string): void {
    this.postsService.getPostByKeywords(data, keyword).subscribe(
      res => {
        if (typeof res !== 'boolean') {
          this.paginator.length = res.length;
          this.postsList = res.postsList;
        }
      }
    );
  }

  onPageChange(): void {
    const { pageSize, pageIndex } = this.paginator;
    const data = { pageSize, pageIndex };
    if (this.searchInput.nativeElement.value.length > 0) {
      this.getPostByKeywords(data, this.searchInput.nativeElement.value);
    } else {
      this.getPostsUsingPagination(data);
    }
  }

  addSearchEvent(): void {
    this.search$ = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      pluck('target', 'value'),
      distinctUntilChanged(),
      debounceTime(1000),
      tap(value => {
        this.paginator.pageIndex = 0;
        if (value) {
          this.getPostByKeywords({ pageSize: this.paginator.pageSize, pageIndex: 0 }, value as string);
        } else {
          this.getPostsUsingPagination();
        }
      }),
    ).subscribe();
  }
}
