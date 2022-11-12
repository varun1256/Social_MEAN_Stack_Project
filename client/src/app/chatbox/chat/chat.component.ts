import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatboxService } from '../chatbox.service';
import * as io from "socket.io-client";
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/utility/snack-bar.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user:String;
  filePath:String;
    room:String;
    messageText:String;
    messageArray:Array<{user:String,message:String}> = [];

 
    url=environment.apiUrl
  constructor(private chatboxService:ChatboxService,private route: ActivatedRoute, private _snackBar: SnackBarService) {

    this.chatboxService.loginProfile().subscribe(resp => {
      this.user = resp['user'].email;
      this.filePath=resp['user'].filePath;
      this._snackBar.openSnackBar("Login profile fetched Successfully", "X");
    }, err => {
      this._snackBar.openSnackBar("Login profile not available", "X");
    });
  
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

 

