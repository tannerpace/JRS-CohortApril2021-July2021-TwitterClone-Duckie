import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'new-quack-form',
  templateUrl: './new-quack-form.component.html',
  styleUrls: ['./new-quack-form.component.css']
})
export class NewQuackFormComponent implements OnInit {

  quackBody: string = "";
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }



  submitQuack(){
    //adds new quack to database 
  }

}
