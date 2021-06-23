import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  showLoginForm: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showLoginForm = true;
  }

  //TODO control when to display the login form and the create user form
  toggleLoginCreateUser() {
    this.showLoginForm = !this.showLoginForm;
  }
}
