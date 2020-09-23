import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Message } from 'src/app/_models/Message';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-Friends-Chat',
  templateUrl: './Friends-Chat.component.html',
  styleUrls: ['./Friends-Chat.component.scss']
})
export class FriendsChatComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private authservice: AuthService, 
    private userservice: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    const currentUserId = +this.authservice.decodedtoken.nameid;
    this.userservice.getMessageThread(this.authservice.decodedtoken.nameid, this.recipientId)
    .pipe(
      tap(messages => {
        for(let i= 0 ; i < messages.length ; i++){
          if(messages[i].isRead === false && messages[i].recipientId === currentUserId){
            this.userservice.markAsRead(currentUserId, messages[i].id);
          }
        }
      }))
    .subscribe( messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage(){
    this.newMessage.recipientId = this.recipientId;
    this.userservice.sendMessage(this.authservice.decodedtoken.nameid, this.newMessage)
        .subscribe((message: Message) =>{
          this.messages.unshift(message);
          this.newMessage.content = '';
        }, error => {
          this.alertify.error(error);
        });

  }

}
