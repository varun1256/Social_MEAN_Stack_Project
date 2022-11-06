import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { MatTableModule } from '@angular/material/table';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FriendsListComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class FriendsModule { }
