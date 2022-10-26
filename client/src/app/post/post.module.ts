import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { CommentsModule } from '../comments/comments.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PostListComponent } from './post-list/post-list.component';
import { PostMypostsComponent } from './post-myposts/post-myposts.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PostMypostsComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    CommentsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    PostMypostsComponent
  ]
})
export class PostModule { }
