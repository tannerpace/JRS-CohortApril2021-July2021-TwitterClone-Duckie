import { Component, OnInit } from '@angular/core';
import { Quack } from 'src/app/models/quack.model';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  public blake: Quack;
  public alex: Quack;
  public jazmin: Quack;
  public soufiane: Quack;
  public tanner: Quack;


  constructor() { }

  ngOnInit(): void {
    this.blake = new Quack({

    })
    this.alex = new Quack({

    })
    this.jazmin = new Quack({

    })
    this.tanner = new Quack({

    })
  
  }

}
