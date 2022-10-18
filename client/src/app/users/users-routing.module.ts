import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';

const routes: Routes = [
  {path:'users/list',component:UsersListComponent},
  {path:'users/view/:id',component:UsersProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
