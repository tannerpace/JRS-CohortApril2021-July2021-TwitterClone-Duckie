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

  public loginUser(userName: string, password: string) {
    let body = {
      userName: userName,
      password: password
    }
    console.log(body)
    return this.http.post(`${this.baseURL}/api/user/login`, body)
  }

  public isValid() {
    console.log("user is: " + this.activeUser != null)
    return this.activeUser != null;
  }

  public setActiveUser(user: User) {
    this.activeUser = user;
    this.newActiveUser$.next(this.activeUser);
  }

  public getActiveUser(): User {
    return this.activeUser
  }

  public getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/api/user/${id}`);
  }

  public getUserByUserName(userName: string): Observable<any> {
    return this.http.get(`${this.baseURL}/api/user/${userName}`);
  }

  public createNewUser(newUser: User): Observable<any> {
    return this.http.post(`${this.baseURL}/api/user`, newUser);
  }

  public editUserInfo(id: number, updatedUserData: User): Observable<any> {
    return this.http.put(`${this.baseURL}/api/user/${id}`, updatedUserData)
  }

  public deleteUser(id: number) {
    return this.http.delete(`${this.baseURL}/api/user/${id}`)
  }

  public getUsersFollowedBy(user: User) {

  }

  public getAllUsersFollowing(user: User) {

  }
};
