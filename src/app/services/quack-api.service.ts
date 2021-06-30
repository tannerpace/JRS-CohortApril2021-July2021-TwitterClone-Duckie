import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quack } from '../models/quack.model';
import { User } from '../models/user.model';
import { HttpService } from './http.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class QuackApiService {
  private baseURL: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.baseURL = HttpService.SERVER_URL;
  }

  createQuack(body): Observable<any> {
   
    return this.http.post(`${this.baseURL}/api/quack`, body);
  }

  deleteQuackById(id: number) {
    return this.http.delete(`${this.baseURL}/api/quack/${id}`);
  }

  likeQuack(id: number): Observable<any> {
    let user = this.userService.getActiveUser();
    let body = {
      qId: id,
      uId: user.id,
    };
    return this.http.put(`${this.baseURL}/api/quack/like`, body);
  }

  repostQuack(id: number): Observable<any> {
    let user = this.userService.getActiveUser();
    let body = {
      qId: id,
      uId: user.id,
    };
    return this.http.put(`${this.baseURL}/api/quack/repost`, body);
  }

  getQuacksByUser(id: number) {
  
    return this.http.get(`${this.baseURL}/api/getQuacks/${id}`);
  }

  getLikedQuacksByUser(user) {
    
     let uId= user.id
    return this.http.get(`${this.baseURL}/api/getlikes/${uId}`);
  }
  getFollowedQuacks(): Observable<any> {
   let   uId= this.userService.getActiveUser().id
  
    return this.http.get(`${this.baseURL}/api/followedquacks/${uId}`);
  }
  getUserById(id) {
    return this.http.get(`${this.baseURL}/api/user/id/${id}"`);
  }
  getFollowersUsersByUser(user) {
    let body = {
      uId: user.id,
    };
    return this.http.post(`${this.baseURL}/api/followers`, body);
  }
}
