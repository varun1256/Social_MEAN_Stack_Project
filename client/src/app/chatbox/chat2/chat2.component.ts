import { Component, OnInit ,Input} from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message';
import { ChatboxService } from '../chatbox.service';

@Component({
  selector: 'app-chat2',
  templateUrl: './chat2.component.html',
  styleUrls: ['./chat2.component.scss']
})
export class Chat2Component implements OnInit {
  @Input() sessionId: string;
  @Input() title: string;
  @Input() sender: string;
  @Input() receiver: string;

  adminLoading$: Observable<boolean>;
  messages$: Observable<Message[]>;
  loading = false;

 // sessionId = Math.random().toString(36).slice(-5);
 constructor(private chatService:ChatboxService) { 
    this.messages$ = this.chatService.getChatMessages(this.sessionId, this.sender);
    this.adminLoading$ = this.chatService.getChatStatus(this.sessionId, this.receiver);
 }

 ngOnInit(): void {
 }
  handleUserMessage(event) {
    const text = event.message;
    if (!text) { return; }
    this.loading = false;
    this.chatService.setLoading(this.sessionId, {[this.sender]: false});
    this.chatService.addMessage(this.sessionId, new Message(text, this.sender));
  }

  onKey(event) {
    if (!event.target.value) {
      this.loading = false;
      this.chatService.setLoading(this.sessionId, {[this.sender]: false});
      return;
    }

    if (!this.loading && event.key !== 'Enter') {
      this.chatService.setLoading(this.sessionId, {[this.sender]: true});
    }

    this.loading = event.key !== 'Enter';
  }

}
