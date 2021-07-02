import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users: any;
  results:any;

  constructor(private userService: UserService) { }
  search: String;
  ngOnInit(): void {
  }
  searchUsers(event) {
    this.search = event.target.value
    this.userService.searchUsers(this.search).subscribe((res) => {
      console.log(res)
      if (res) {
        this.users = res
        if (res.length === 0) {
          console.error("no data")
        }
      }
    },
      (err) => {
        console.log(err);
        console.log("error")
      })
  
  this.results = this.users;
return this.results;  }
};




