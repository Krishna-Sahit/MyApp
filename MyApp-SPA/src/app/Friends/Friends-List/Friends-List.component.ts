import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-Friends-List',
  templateUrl: './Friends-List.component.html',
  styleUrls: ['./Friends-List.component.scss']
})
export class FriendsListComponent implements OnInit {
  users: User[];

  constructor(private userservice: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.users = data['users'];
    });
  }

  // loadUsers(){
  //   this.userservice.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
