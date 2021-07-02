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

  @Input() quack:Quack;
  

  constructor(private quackApi: QuackApiService,
    private userService:UserService) { }

  ngOnInit(): void {
  }

  addRepost() {
    this.quackApi.repostQuack(this.quack.id).subscribe((response) => {
      window.location.reload()
    }, (err) => {

    })
  }
  addLike() {
    this.quackApi.likeQuack(this.quack.id).subscribe((response) => {
      window.location.reload()
    }, (err) => {
      console.error("ERROR - Could not like quack: ", err)
    })
  }

  reply(){

  }

}
