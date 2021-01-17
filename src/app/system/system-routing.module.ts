import { FeedComponent } from './feed/feed.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedPostComponent } from './selected-post/selected-post.component';
import { AddNewPostComponent } from './add-new-post/add-new-post.component';
import { SystemComponent } from './system.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: SystemComponent, children: [
      { path: 'feed', component: FeedComponent },
      { path: 'new-post', component: AddNewPostComponent, canActivate: [AuthGuard] },
      { path: 'selected-post/:id', component: SelectedPostComponent },
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: '**', redirectTo: 'feed' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
