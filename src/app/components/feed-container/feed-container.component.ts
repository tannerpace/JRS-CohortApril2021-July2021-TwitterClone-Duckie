import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-feed-container',
  templateUrl: './feed-container.component.html',
  styleUrls: ['./feed-container.component.css']
})
export class FeedContainerComponent implements OnInit {

  constructor(private userService: UserService) { }
  user
quackList=[]
  ngOnInit(): void {
    this.user=this.userService.getActiveUser()
  }

}
