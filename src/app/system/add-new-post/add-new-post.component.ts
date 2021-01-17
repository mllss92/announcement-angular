import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { PostsService } from './../../shared/services/posts.service';

@Component({
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.css']
})
export class AddNewPostComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private router: Router,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      text: new FormControl(null, [Validators.required, Validators.minLength(25)]),
    });
  }

  onSubmit(): void {
    this.postsService.createPost(this.form.value).subscribe(
      res => {
        this.router.navigate(['/main']);
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['main']);
  }

}
