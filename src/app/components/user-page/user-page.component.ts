import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common'
import { QuackApiService } from 'src/app/services/quack-api.service';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  
  @Input() user: User;
  public activeUser: User;
  quacks;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private quackAPi: QuackApiService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        if (data[0]) {
          this.user = data[0];
          console.log(data[0]);
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
    this.quackAPi.getQuacksByUser(this.user.id).subscribe((res)=>{
      this.quacks=res
    },(err)=>{
      console.log(err)
    })

  }

  followClicked() {
    // follow a user
    console.log('clicked follow button', this.activeUser);
    this.userService.followUser(this.activeUser, this.user)
    .subscribe(data => {}, error => {});
  }

  unfollowClicked() {
    // unfollow a user
    console.log('clicked unfollow button', this.activeUser);
    this.userService.unfollowUser(this.activeUser, this.user)
    .subscribe(data => {}, error => {});
  }

  goBack(){
    this.location.back();
  }
}
