import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PostsService } from './../../shared/services/posts.service';
import { Post } from './../../shared/models/post';

@Component({
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.css']
})
export class EditPostDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private dialogRef: MatDialogRef<EditPostDialogComponent>,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.data.title, [Validators.required, Validators.minLength(6)]),
      text: new FormControl(this.data.text, [Validators.required, Validators.minLength(25)]),
    });
  }

  dataChangeDetection(): boolean {
    return this.data.title === this.form.value.title && this.data.text === this.form.value.text;
  }

  onSubmit(): void {
    this.postsService.editPost(this.getEditedPostData()).subscribe(
      res => {
        this.dialogRef.close(res);
      }
    );
  }

  private getEditedPostData(): Post {
    return Object.assign({}, this.data, this.form.value);
  }

}
