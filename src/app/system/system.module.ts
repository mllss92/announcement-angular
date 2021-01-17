import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsService } from './../shared/services/posts.service';
import { SharedModule } from './../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { NavComponent } from './nav/nav.component';
import { FeedComponent } from './feed/feed.component';
import { AddNewPostComponent } from './add-new-post/add-new-post.component';
import { PostComponent } from './post/post.component';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';
import { SelectedPostComponent } from './selected-post/selected-post.component';


@NgModule({
  declarations: [
    SystemComponent,
    NavComponent,
    FeedComponent,
    AddNewPostComponent,
    PostComponent,
    EditPostDialogComponent,
    SelectedPostComponent,
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
  ],
  providers: [
    PostsService,
  ]
})
export class SystemModule { }
