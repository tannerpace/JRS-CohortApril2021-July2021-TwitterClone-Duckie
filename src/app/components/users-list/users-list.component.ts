import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input() users: User[];
  public activeUser: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.activeUser = this.userService.getActiveUser();
    for(let user of this.users) {
      user["isFollowed"] = false;
    }
  }

  follow(user: User) {

  }

  unfollow(user: User) {

  }

}
