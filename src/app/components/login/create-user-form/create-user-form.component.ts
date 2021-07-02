import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent implements OnInit {

  user: User;
  confirmedPassword: string;

  showCreateInputs: boolean;

  @Output() toggleForms = new EventEmitter<void>();


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = { 
      userName: '', 
      password: '',
      bio: '',
      website: '',
      profilePic: 'profile' + Math.floor(Math.random() * 10) +  '.png'
     }
    this.user = new User(this.user);
  }

  toggleForm() {
    this.toggleForms.next();
  }

  onSubmit(form: NgForm) {

    // /^[a-zA-Z0-9_.]*$/.test(this.username)
    // console.log(/^[a-zA-Z0-9_.]*$/.test("!@#%"))
    if (this.user.password != this.confirmedPassword) {
      console.log("password mismatch")
      return;

    } else if (!/^[a-zA-Z0-9_]*$/.test(this.user.userName)) {
      console.log("invalid username")
      return;
    } else {

      this.userService.createNewUser(this.user)
        .subscribe(
          data => {
            if(!data) {
              console.log("ERROR Create User Failed")
            }
            console.log("New User Created Successfully");
            this.userService.setActiveUser(data);

          },
          error => {
            console.error("ERROR creating user: ", error)
          }
        );
    }
  }
}
