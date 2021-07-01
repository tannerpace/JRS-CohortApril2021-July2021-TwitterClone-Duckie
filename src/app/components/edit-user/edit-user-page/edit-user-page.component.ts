import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css'],
})
export class EditUserPageComponent implements OnInit {
  @Input() user: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        console.log(data)
        if (data.user) {
          this.user = data.user;
          console.log(data.user);
        } else {
          this.user = null;
        }
      },
      (error) => {
        this.user = null;
      }
    );
  }
}
