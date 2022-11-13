import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginProfileComponent } from './login-profile/login-profile.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { AuthguardService } from '../authguard.service';

const routes: Routes = [
  {path:'users/list',component:UsersListComponent,canActivate:[AuthguardService]},
  {path:'users/view/:id',component:UsersProfileComponent,canActivate:[AuthguardService]},
  {path:'users/profile',component:LoginProfileComponent,canActivate:[AuthguardService]},
  {path:'users/edit/:id',component:ProfileEditComponent,canActivate:[AuthguardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
