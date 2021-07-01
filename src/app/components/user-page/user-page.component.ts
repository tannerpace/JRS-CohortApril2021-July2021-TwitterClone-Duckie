import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common'
import { Quack } from 'src/app/models/quack.model';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  
  @Input() user: User;
  public activeUser: User;
  public quackList: Quack[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        if (data.user) {
          this.user = data.user;
        } else {
          this.user = null;
        }
        this.activeUser = this.userService.getActiveUser();
      },
      (error) => {
        this.user = null;
        this.activeUser = this.userService.getActiveUser();
      }
    );
    this.quackList = [];
  }

  followClicked() {
    // follow a user
    this.userService.followUser(this.activeUser, this.user)
    .subscribe(data => {}, error => {});
  }

  unfollowClicked() {
    // unfollow a user
    this.userService.unfollowUser(this.activeUser, this.user)
    .subscribe(data => {}, error => {});
  }

  goBack(){
    this.location.back();
  }

  changeFeedToQuacks() {
    this.router.navigate([this.user.userName]);
  }
}
