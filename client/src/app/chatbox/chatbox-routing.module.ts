import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../authguard.service';
import { ChatComponent } from './chat/chat.component';
//import { Chat2Component } from './chat2/chat2.component';

const routes: Routes = [
  {path:'chatbox',component:ChatComponent,canActivate:[AuthguardService]},
 // {path:'user/chatbox' ,component:Chat2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatboxRoutingModule { }
