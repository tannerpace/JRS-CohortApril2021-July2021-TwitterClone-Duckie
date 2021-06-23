import { Component, Input, OnInit } from '@angular/core';
import { Quack } from 'src/app/models/quack.model';

@Component({
  selector: 'quack-card',
  templateUrl: './quack-card.component.html',
  styleUrls: ['./quack-card.component.css']
})
export class QuackCardComponent implements OnInit {

  @Input() quack: Quack;
  
  constructor() { }

  ngOnInit(): void {
  }

}
