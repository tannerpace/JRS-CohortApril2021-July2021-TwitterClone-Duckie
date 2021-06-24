import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() toggleForms = new EventEmitter<void>();
  @Output() newLogin = new EventEmitter<any>();

  userName: string;
  password: string;


  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.userName = "";
    this.password = "";
  }

  toggleForm() {
    this.toggleForms.next();
  }

  onSubmit(form: NgForm) {

    console.log("login form submitted")
    this.userService.loginUser(this.userName, this.password)
      .subscribe(
        data => { 
          if(!data){
            console.log("password mismatch")
            //password did not match
            // do something
            return;
          }
          console.log("login successful")
          // do something later
          console.log(data)

          let user = new User({
            userName: data[0].userName,
            screenName: data[0].screenName,
            birthDate: data[0].birthDate
          });

          this.userService.setActiveUser(user);
           this.router.navigate([""]);          
        },
        error => {
          console.error("ERROR loggin in: ", error)
         }
      );
  }
}
