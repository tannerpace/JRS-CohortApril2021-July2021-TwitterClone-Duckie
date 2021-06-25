import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent implements OnInit {

  @Input() user: User;

  constructor(    private userService: UserService    ) { }

  ngOnInit(): void {
    // this.user = this.activeUser;
    this.user = this.userService.getActiveUser();
  }

}
