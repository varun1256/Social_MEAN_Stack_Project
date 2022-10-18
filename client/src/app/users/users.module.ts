import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MatTableModule } from '@angular/material/table';
import { UsersProfileComponent } from './users-profile/users-profile.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersProfileComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
