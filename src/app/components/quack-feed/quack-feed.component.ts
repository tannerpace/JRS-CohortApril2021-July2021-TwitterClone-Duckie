import { Component, OnInit } from '@angular/core';
import { Quack } from 'src/app/models/quack.model';
import { QuackApiService } from 'src/app/services/quack-api.service';

@Component({
  selector: 'quack-feed',
  templateUrl: './quack-feed.component.html',
  styleUrls: ['./quack-feed.component.css']
})
export class QuackFeedComponent implements OnInit {

  public quacks;

  constructor(private quackApi: QuackApiService) { }

  ngOnInit(): void {
 this.quackApi.getFollowedQuacks().subscribe((response)=>{
   this.quacks=response
 },(err)=>{
   console.log(err)
 })


  }

}
