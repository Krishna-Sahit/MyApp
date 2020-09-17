import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-Friends-card',
  templateUrl: './Friends-card.component.html',
  styleUrls: ['./Friends-card.component.scss']
})
export class FriendsCardComponent implements OnInit {
  @Input() user: User;
  
  constructor() { }

  ngOnInit() {
  }

}
