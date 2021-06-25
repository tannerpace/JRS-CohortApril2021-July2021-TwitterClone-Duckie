import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  @Input() user: User;

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        if(data[0]) {
          this.user = data[0]
          console.log(data[0])
        } else {
          this.user = null;
        }
      },
        error => {
          this.user = null;
        });
  }

}
