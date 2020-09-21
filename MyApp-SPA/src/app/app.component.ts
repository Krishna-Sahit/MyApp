import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/User';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwthelper = new JwtHelperService();


  constructor(private authservice: AuthService){}

  ngOnInit(){
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token){
      this.authservice.decodedtoken = this.jwthelper.decodeToken(token);
    }
    if(user){
      this.authservice.currentuser = user;
      this.authservice.ChangeMemberPhoto(user.photoUrl);
    }
  }

}
