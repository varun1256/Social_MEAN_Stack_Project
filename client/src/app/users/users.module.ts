import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MatTableModule } from '@angular/material/table';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { LoginProfileComponent } from './login-profile/login-profile.component';
import { PostModule } from '../post/post.module';
import { MatInputModule } from '@angular/material/input';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersProfileComponent,
    LoginProfileComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    PostModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
