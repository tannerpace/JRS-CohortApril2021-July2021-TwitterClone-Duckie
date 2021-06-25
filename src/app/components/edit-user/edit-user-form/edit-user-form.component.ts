import { Component, Input, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {

  user: User ={};

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getActiveUser();
    console.log("got user in edit form", this.userService.getActiveUser())
  }

  onSubmit() {
    this.userService.editUserInfo(this.user.id, this.user)
      .subscribe(data => {
        console.log("revieved data after update", data)
        this.router.navigate([this.user.userName])
      }, error => {
        console.error(error)
        alert("Error updating user data")
        this.router.navigate([this.user.userName])
      });
  }
  cancel() {
    this.router.navigate([this.user.userName])
  }
}
