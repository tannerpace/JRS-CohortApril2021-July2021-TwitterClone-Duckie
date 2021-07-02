import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  constructor(private userService:UserService) { }
search : String;
  ngOnInit(): void {
  }
  searchUsers(event){
    
  //     this.search = event.target.value
  //     console.log(this.search)
     
  //     this.userService.searchData(this.search).subscribe((res) => {
        
  //       if (res) {
  //         this.user = res
  //         if (res.length === 0) {
  //           this.noData = true
  //         } else {
  //           this.noData = false
  //         }
  //       }
  //     },
  //       (err) => {
  //         console.log(err);
  //         console.log("error")
  //       })
  //   }

  }

}
