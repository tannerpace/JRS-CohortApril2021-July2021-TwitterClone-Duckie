import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  activeUser:User;

  newActiveUser$: Subject<User> = new Subject<User>();

  constructor() { }

  setActiveUser(user: User){
    this.activeUser = user;
    this.newActiveUser$.next(this.activeUser);
  }

  getActiveUser(): User {
    return this.activeUser
  }
};
