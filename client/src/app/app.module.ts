import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { RequestModule } from './request/request.module';
import { LayoutModule } from './layout/layout.module';
import { PostModule } from './post/post.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';
import { UtilityModule } from './utility/utility.module';
import { appRoutes } from './app.route';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FriendsModule } from './friends/friends.module';
import { HttpClientModule } from '@angular/common/http';
import { CommentsModule } from './comments/comments.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FriendsModule,
    CommentsModule,
    UsersModule,
    RequestModule,
    LayoutModule,
    UtilityModule,
    FormsModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    CommonModule,
  
    HttpClientModule,
    PostModule,
    RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true, relativeLinkResolution: 'legacy' } 
		)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
