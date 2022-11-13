import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../authguard.service';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
const routes: Routes = [
  {path:'post/create',component:PostCreateComponent,canActivate:[AuthguardService]},
  {path:'post/list',component:PostListComponent,canActivate:[AuthguardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
