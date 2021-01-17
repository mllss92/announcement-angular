import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostsService } from './../../shared/services/posts.service';
import { Post } from './../../shared/models/post';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  templateUrl: './selected-post.component.html',
  styleUrls: ['./selected-post.component.css']
})
export class SelectedPostComponent implements OnInit, OnDestroy {

  post!: Post;
  similarsPost!: Post[];
  params$!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.params$ = this.route.params.subscribe(params => this.getData(params.id));
  }

  ngOnDestroy(): void {
    if (this.params$) {
      this.params$.unsubscribe();
    }
  }

  getData(id: string): void {
    combineLatest(
      this.postsService.getPostById(id),
      this.postsService.getSimilarPosts(id)
    ).subscribe(
      ([post, similarsPost]) => {
        if (typeof post !== 'boolean' && typeof similarsPost !== 'boolean') {
          this.post = post;
          this.similarsPost = similarsPost;
        }
      }
    );
  }

}
