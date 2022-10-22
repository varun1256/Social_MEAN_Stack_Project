import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MatTableModule } from '@angular/material/table';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { LoginProfileComponent } from './login-profile/login-profile.component';
import { PostModule } from '../post/post.module';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersProfileComponent,
    LoginProfileComponent
  ],
  imports: [
    CommonModule,
    PostModule,
    MatTableModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
