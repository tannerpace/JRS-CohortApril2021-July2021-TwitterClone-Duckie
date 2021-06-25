import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'duckie-main-page',
  templateUrl: './duckie-main-page.component.html',
  styleUrls: ['./duckie-main-page.component.css'],
})
export class DuckieMainPageComponent implements OnInit {
  user: User;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getActiveUser();
    console.log(this.user);
  }

  buttonClicked() {
    let user = { username: 'blake', screenName: 'screen name' };
    console.log('clicked');
    this.router.navigate(['/user', user.username]);
  }
}
