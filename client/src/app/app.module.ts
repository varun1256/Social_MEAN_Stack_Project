import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { RequestModule } from './request/request.module';
import { LayoutModule } from './layout/layout.module';
import { PostModule } from './post/post.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';
import { appRoutes } from './app.route';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FriendsModule } from './friends/friends.module';
import { LikeModule } from './like/like.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { CommentsModule } from './comments/comments.module';
import { ChatboxModule } from './chatbox/chatbox.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NbButtonModule, NbChatModule, NbLayoutModule, NbSpinnerModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


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
    ChatboxModule,
    HomeModule,
    LikeModule,
    LayoutModule,
    FormsModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbChatModule,
    NbSpinnerModule,
  
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
