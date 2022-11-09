import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatboxService } from '../chatbox.service';
import * as io from "socket.io-client";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user:String;
    room:String;
    messageText:String;
    messageArray:Array<{user:String,message:String}> = [];

 

  constructor(private chatboxService:ChatboxService) {
    this.chatboxService.newUserJoined()
    .subscribe(data=> this.messageArray.push(data));


    this.chatboxService.userLeftRoom()
    .subscribe(data=>this.messageArray.push(data));

    this.chatboxService.newMessageReceived()
    .subscribe(data=>this.messageArray.push(data));
   }

  ngOnInit(): void {
    
  }
  join(){
    this.chatboxService.joinRoom({user:this.user, room:this.room});
}

leave(){
    this.chatboxService.leaveRoom({user:this.user, room:this.room});
}

sendMessage()
{
    this.chatboxService.sendMessage({user:this.user, room:this.room, message:this.messageText});
}

}

 

