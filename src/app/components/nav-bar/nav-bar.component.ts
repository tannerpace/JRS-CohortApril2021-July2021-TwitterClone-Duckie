import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() user: User;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.user);
  }
  logout() {
    this.userService.logoutActiveUser()
    alert("You successfully logged out!")
    this.router.navigate(['/login']);
  }

}
