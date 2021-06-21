import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent implements OnInit {

  //TODO: create a user object and user ngModel to link that
  user //: User;
  // user's properties to the html inputs
  //  interface User {
  //  username : string;
  //  screenname: string;
  //  birthday: number ;
  //  password: any;
  //  confirmpassword: any;
  // }
 

  showCreateInputs: boolean;

  @Output() toggleForms = new EventEmitter<void>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = {username: '', password: ''}
    // this.user = new User();
  }

  myFunction() {
    console.log('button clicked')
    this.toggleForms.next();
  }

  createUser() {
    // this.userService.createUser(this.user);
  }
}
