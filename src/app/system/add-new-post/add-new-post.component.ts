import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ValidatorsService } from './../../shared/validators/validators.service';
import { PostsService } from './../../shared/services/posts.service';

@Component({
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.css']
})
export class AddNewPostComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private router: Router,
    private validatorsService: ValidatorsService,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.validatorsService.getMinLength().title),
        this.validatorsService.trimValidator(this.validatorsService.getMinLength().title),
        this.validatorsService.blanksReplacer(),
      ]),
      text: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.validatorsService.getMinLength().text),
        this.validatorsService.trimValidator(this.validatorsService.getMinLength().text),
        this.validatorsService.blanksReplacer(),
      ]),
    });
  }

  onSubmit(): void {
    this.trimFormValue();
    this.postsService.createPost(this.form.value).subscribe(
      res => {
        this.router.navigate(['/main']);
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['main']);
  }

  private trimFormValue(): void {
    this.form.value.title = this.form.value.title.trim();
    this.form.value.text = this.form.value.text.trim();
  }

}
