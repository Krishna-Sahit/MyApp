import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/Message';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-Chat',
  templateUrl: './Chat.component.html',
  styleUrls: ['./Chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private userservice: UserService, private route: ActivatedRoute,
              private alertify: AlertifyService, private authservice: AuthService) { }

  ngOnInit() {

    this.route.data.subscribe( data =>{
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    }); 
  }

  loadMessages(){
    this.userservice.getMessages(this.authservice.decodedtoken.nameid, this.pagination.currentPage, 
      this.pagination.itemsPerPage, this.messageContainer)
      .subscribe( (res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination
      }, error => {
        this.alertify.error(error);
      });
     
  }

  deleteMessage(id: number){
    this.alertify.confirm('Are you sure you want to delete this message?', () => {
      this.userservice.deleteMessage(id, this.authservice.decodedtoken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m=> m.id === id), 1);
        this.alertify.success('Message deleted.');
      }, error => {
        this.alertify.error('Falied to delete message.');
      });
    });
  }

  pageChanged(event: any): void{
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }


}
