import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  @Input() user: any;

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.user = data[0]
        console.log(data[0])
      },
        error => {
          this.user = null;
        });
  }

}
