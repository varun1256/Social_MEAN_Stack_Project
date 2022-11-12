import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import  io from 'socket.io-client';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';

import { Message } from '../models/message';
interface ChatStatus {
    [sender: string]: boolean;
  };
  


@Injectable({
  providedIn: 'root'
})
export class ChatboxService {

  constructor(private db: AngularFirestore,private http: HttpClient) { }
  private socket = io('http://localhost:3000');

    joinRoom(data)
    {
        this.socket.emit('join',data);
    }

    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data){
        this.socket.emit('leave',data);
    }

    userLeftRoom(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data)
    {
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    //New
    public getChat(id: string) {
        return this.db.collection('chats').doc(id);
      }
    
      public createChat(id: string) {
        return this.db.collection('chats').doc(id).set({admin: false, user: false});
      }
    
      public deleteChat(id: string) {
        return this.db.collection('chats').doc(id).delete();
      }
    
    
      public getChatMessages(id: string, sender: string) {
        const orderByDate: QueryFn = ref => ref.orderBy('date');
        const messagesTimestampToDate = (messages: Message[]) => messages.map(message => {
          return {
            ...message,
            date: (message.date as any).toDate(),
          };
        });
        const setMessageReply = (messages: Message[]) => messages.map(message => Message.setReply(message, sender));
        const messagesCollection = this.db.collection('chats').doc(id).collection('messages', orderByDate);
    
        return messagesCollection.valueChanges().pipe(
          map(messagesTimestampToDate),
          map(setMessageReply),
        );
      }
    
      public getChatStatus(id: string, sender: string) {
        return this.db.collection('chats').doc(id).valueChanges().pipe(
          map(chat => chat ? chat[sender] : false),
        );
      }
    
      public setLoading(id: string, status: ChatStatus) {
        return this.db.collection('chats').doc(id).update(status);
      }
    
      public addMessage(chatId: string, message: Message) {
        return this.db.collection('chats').doc(chatId).collection('messages').add({...message});
      }
}
