import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Post } from './../../shared/models/post';
import { PostsService } from './../../shared/services/posts.service';
import { AuthService } from './../../shared/services/auth.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Output() updatePost = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private matDialog: MatDialog,
    private router: Router,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }

  getUserId(): string {
    return this.authService.getUserId();
  }

  openDeletePostConfirmationDialog(): void {
    const dialog = this.matDialog.open(ConfirmationDialogComponent, {
      position: { top: '50px' },
      data: 'Do you want to delete this announcement?'
    });
    dialog.afterClosed().subscribe(
      res => {
        if (res) {
          this.deletePost();
        }
      }
    );
  }

  private deletePost(): void {
    this.postsService.deletePost(this.post._id).subscribe(
      res => {
        this.updatePost.emit();
      }
    );
  }

  openEditPostDialog(): void {
    const dialog = this.matDialog.open(EditPostDialogComponent, {
      data: this.post,
      position: { top: '70px' },
      disableClose: true
    });
    dialog.afterClosed().subscribe(
      res => {
        if (res) {
          this.post = res;
        }
      }
    );
  }

  test(): void {
    this.router.navigateByUrl(`/main/selected-post/${this.post._id}`);
  }
}
