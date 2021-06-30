import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quack } from 'src/app/models/quack.model';
import { QuackApiService } from 'src/app/services/quack-api.service';

@Component({
  selector: 'quack-feed',
  templateUrl: './quack-feed.component.html',
  styleUrls: ['./quack-feed.component.css']
})
export class QuackFeedComponent implements OnInit {

  public quacks: Quack[] = [];

  constructor(private quackApi: QuackApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        this.quacks = data[0];
        console.log(data[0])
      },
      (error) => {
        console.error("ERROR retrieving quacks. ", error);
        this.quacks = [];
      }
    );
  }

}
