import { Component, OnInit } from '@angular/core';
import { Quack } from 'src/app/models/quack.model';

@Component({
  selector: 'quack-feed',
  templateUrl: './quack-feed.component.html',
  styleUrls: ['./quack-feed.component.css']
})
export class QuackFeedComponent implements OnInit {

  public quacks: Quack[];

  constructor() { }

  ngOnInit(): void {
    this.quacks = []
    for(let i = 0; i < 5; i++) {
      this.quacks.push({
        userId: i, 
        body: 
          "Yar Pirate Ipsum \
            Prow scuttle parrel provost Sail ho \
            shrouds spirits boom mizzenmast yardarm."
      })
    }
  }

}
