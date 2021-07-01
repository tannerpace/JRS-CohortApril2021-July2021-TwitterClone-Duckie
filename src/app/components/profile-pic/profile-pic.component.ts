import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css'],
})
export class ProfilePicComponent implements OnInit {
  
  @Input() user: User;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.user);
  }

  navToUser() {
    this.router.navigate([this.user.userName]);
  }
}
