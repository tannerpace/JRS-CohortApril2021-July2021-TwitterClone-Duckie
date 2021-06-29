import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Output() toggleForms = new EventEmitter<void>();
  @Output() newLogin = new EventEmitter<any>();

  userName: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userName = '';
    this.password = '';
  }

  toggleForm() {
    this.toggleForms.next();
  }
  showPass() {
    var x = <HTMLInputElement>document.getElementById('login');
    if (x.type == 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  onSubmit(form: NgForm) {
    console.log('login form submitted');
    this.userService.loginUser(this.userName, this.password).subscribe(
      (user) => {
        if (!user) {
          console.log('password mismatch');
          //password did not match
          // do something
          return;
        }
        console.log('login successful');
        // do something later
        console.log(user);

        //user[0] is the user object returned from the DB
        let activeUser = new User(user);

        console.log('why is this like this: ', user);
        console.log('setting active user from login: ', activeUser);
        this.userService.setActiveUser(activeUser);
        this.router.navigate(['']);
      },
      (error) => {
        console.error('ERROR loggin in: ', error);
      }
    );
  }
}
