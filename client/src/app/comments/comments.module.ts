import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsCreateComponent } from './comments-create/comments-create.component';
import { MatInputModule } from '@angular/material/input';
import { CommentService } from './comment.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsListComponent } from './comments-list/comments-list.component';



@NgModule({
  declarations: [
    CommentsCreateComponent,
    CommentsListComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommentsRoutingModule
  ],
  exports:[
    CommentsCreateComponent,
    CommentsListComponent
  ],
  providers:[
    CommentService
  ]
})
export class CommentsModule { }
