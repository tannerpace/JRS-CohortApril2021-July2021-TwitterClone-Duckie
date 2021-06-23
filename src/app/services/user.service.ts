import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string;
  public activeUser:User;

  public newActiveUser$: Subject<User> = new Subject<User>();

  constructor() {
    this.baseURL = HttpService.SERVER_URL;
  }

  loginUser() {

  }

  setActiveUser(user: User){
    this.activeUser = user;
    this.newActiveUser$.next(this.activeUser);
  }

  getActiveUser(): User {
    return this.activeUser
  }

  getUserById(id: number) {

  }

  getUserByUserName(userName: string) {

  }

  createNewUser(newUser: User) {

  }

  editUserById(id: number, updatedUserData: User) {

  }

  deleteUser(user: User) {

  }

  getUsersFollowedBy(user: User) {

  }

  getAllUsersFollowing(user: User) {

  }
};
