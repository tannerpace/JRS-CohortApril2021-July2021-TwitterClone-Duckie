import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string;
  public activeUser: User;

  public newActiveUser$: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {
    this.baseURL = HttpService.SERVER_URL;
  }

  loginUser() {

  }

  setActiveUser(user: User) {
    this.activeUser = user;
    this.newActiveUser$.next(this.activeUser);
  }

  getActiveUser(): User {
    return this.activeUser
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/api/user/${id}`);
  }

  getUserByUserName(userName: string): Observable<any> {
    return this.http.get(`${this.baseURL}/api/user/${userName}`);
  }

  createNewUser(newUser: User): Observable<any> {
    return this.http.post(`${this.baseURL}/api/user`, newUser);
  }

  editUserInfo(id: number, updatedUserData: User): Observable<any> {
    return this.http.put(`${this.baseURL}/api/user/${id}`, updatedUserData)
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseURL}/api/user/${id}`)
  }

  getUsersFollowedBy(user: User) {

  }

  getAllUsersFollowing(user: User) {

  }
};
