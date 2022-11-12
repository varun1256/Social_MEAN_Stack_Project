import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatboxRoutingModule } from './chatbox-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { Chat2Component } from './chat2/chat2.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NbButtonModule, NbChatModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [
    ChatComponent,
    Chat2Component
  ],
  imports: [
    CommonModule,
    ChatboxRoutingModule,
    FormsModule,
    AngularFirestoreModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbChatModule,
    NbSpinnerModule,
  ]
})
export class ChatboxModule { }
