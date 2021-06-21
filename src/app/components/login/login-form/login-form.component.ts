import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  //TODO: create an output to control when create user form 
  // is displayed
  @Output() toggleForms = new EventEmitter<void>();
  @Output() newLogin = new EventEmitter<any>();

  //TODO: create a user object and user ngModel to link that
  // user's properties to the html inputs
  user = {username: '', password: ''}; //: User; // {username, screenname, password, bio, website}


  constructor() { }

  ngOnInit(): void {
  }

  login() {

    // call service.login
  }

  //TODO: write function will OUTPUT the create form control output
  myFunction() {
    this.toggleForms.next();
  }

  createUser() {
    //later -> this.service.createuser();
  }
}
