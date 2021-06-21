import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'duckie-main-page',
  templateUrl: './duckie-main-page.component.html',
  styleUrls: ['./duckie-main-page.component.css']
})
export class DuckieMainPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  buttonClicked() {
    let user = {username: "blake", screenName: "screen name"}
    console.log("clicked");
    this.router.navigate(['/user', user.username]);
  }
}
