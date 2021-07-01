import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quack } from 'src/app/models/quack.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-reply-page',
  templateUrl: './reply-page.component.html',
  styleUrls: ['./reply-page.component.css'],
})
export class ReplyPageComponent implements OnInit {

  @Input() quack: Quack | any;
  public user: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        console.log(data)
        this.quack = data.quack;
      },
      (error) => {
        console.error('ERROR getting a quack: ', error);
      }
    );
  }
}
