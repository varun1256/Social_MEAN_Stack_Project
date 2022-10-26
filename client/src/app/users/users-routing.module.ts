import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginProfileComponent } from './login-profile/login-profile.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  {path:'users/list',component:UsersListComponent},
  {path:'users/view/:id',component:UsersProfileComponent},
  {path:'users/profile',component:LoginProfileComponent},
  {path:'users/edit/:id',component:ProfileEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
