import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-Friends-card',
  templateUrl: './Friends-card.component.html',
  styleUrls: ['./Friends-card.component.scss']
})
export class FriendsCardComponent implements OnInit {
  @Input() user: User;
  
  constructor(private authservice: AuthService, 
    private userservice: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number){
    this.userservice.sendLike(this.authservice.decodedtoken.nameid, id). subscribe( data => {
      this.alertify.success("You have liked: " + this.user.knownAs);
    },
    error =>{
      this.alertify.error(error);
    });
  }

}
