import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css'],
})
export class EditUserFormComponent implements OnInit {
  @Input() user: User;

  profilePics: any[];
  showProfilePics: boolean;

  selectedProfilePic: string;
  delOption:boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.showProfilePics = false;
    this.profilePics = [];
    for (let i = 1; i <= 10; i++) {
      this.profilePics.push(i);
    }
    this.selectedProfilePic = this.user.profilePic;
  }

  onSubmit() {
    this.userService.editUserInfo(this.user.id, this.user).subscribe(
      (data) => {
        this.userService.updateActiveUser();
        this.router.navigate([this.user.userName]);
      },
      (error) => {
        console.error(error);
        alert('Error updating user data');
        this.router.navigate([this.user.userName]);
      }
    );
  }

  cancel() {
    this.router.navigate([this.user.userName]);
  }

  deleteUser() {
    // delete the user
    this.userService.deleteUser(this.user.id).subscribe(
      (data) => {
        this.router.navigate(["login"]);
      },
      (error) => {}
    );
  }

  deleteCheck() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.deleteUser();
    }
  }

  togglePicSelect() {
    this.showProfilePics = !this.showProfilePics;
  }

  profilePicCancel() {
    this.selectedProfilePic = this.user.profilePic;
    this.togglePicSelect();
  }

  profilePicClicked(imgFileName: string) {
    // "select" this image
    this.selectedProfilePic = imgFileName;
  }

  profilePicConfirm() {
    this.togglePicSelect();
    this.user.profilePic = this.selectedProfilePic;
  }
  deleteOption(){
    this.delOption = !this.delOption
  }
}
