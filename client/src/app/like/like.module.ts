import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LikeRoutingModule } from './like-routing.module';
import { ListDialogComponent } from './list-dialog/list-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ListDialogComponent
  ],
  imports: [
    CommonModule,
    LikeRoutingModule,
    MatDialogModule],
  exports:[
    ListDialogComponent
  ]
})
export class LikeModule { }
