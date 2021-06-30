import { Component, Input, OnInit } from '@angular/core';
import { Quack } from 'src/app/models/quack.model';
import { QuackApiService } from 'src/app/services/quack-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'quack-card',
  templateUrl: './quack-card.component.html',
  styleUrls: ['./quack-card.component.css']
})
export class QuackCardComponent implements OnInit {

  @Input() quack;
  otherUser

  constructor(private quackApi: QuackApiService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.quack.userId).subscribe((response) => {
      this.otherUser = response
    })
  }

  addRepost() {
    this.quackApi.repostQuack(this.quack.id).subscribe((response) => {
      window.location.reload()
    }, (err) => {

    })
  }
  addLike() {
    console.log(this.quack)
    this.quackApi.likeQuack(this.quack.id).subscribe((response) => {
      window.location.reload()
    }, (err) => {
      console.log(err)
    })
  }

  reply(){

  }

}
