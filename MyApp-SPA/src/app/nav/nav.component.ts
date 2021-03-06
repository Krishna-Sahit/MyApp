import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, 
    private router: Router) { }

  ngOnInit() {
    this.authService.currentphotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl)
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully.');
    }, error => {
      this.alertify.error(error);
    }, () =>{
      this.router.navigate(['/friends']);
    });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedtoken = null;
    this.authService.currentuser = null;
    this.alertify.message('Logged out.');
    this.router.navigate(['/home']);
    }

}
