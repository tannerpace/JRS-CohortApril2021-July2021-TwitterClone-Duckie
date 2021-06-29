import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Quack } from 'src/app/models/quack.model';
import { QuackApiService } from 'src/app/services/quack-api.service';

@Component({
  selector: 'new-quack-form',
  templateUrl: './new-quack-form.component.html',
  styleUrls: ['./new-quack-form.component.css'],
})
export class NewQuackFormComponent implements OnInit {
  @Input() user: User;
  quack: Quack;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private quackApiService: QuackApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getActiveUser();
    this.quack = new Quack({ userId: this.user.id, body: '' });
    console.log(this.user);
  }

  reRoutePage() {
    this.router.navigate(['/home']);
  }

  submitQuack() {
    if (this.quack.body == '') {
      console.log('No Quack Entered');
      return;
    }
    console.log('posting');
    this.quackApiService.createQuack(this.quack.body, this.user.id).subscribe(
      (response) => {
        console.log('New Quack Created');
        this.userService.updateActiveUser();
        this.reRoutePage();
      },
      (error) => {
        alert('Quack was not created');
      }
    );
  }
}
