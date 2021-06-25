import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpService } from './http.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class QuackApiService {

  private baseURL: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.baseURL = HttpService.SERVER_URL;
  }

  createQuack(quack): Observable<any> {
    let body = {
      id: quack.id,
      quack: quack.text
    }
    return this.http.post(`${this.baseURL}/api/tweet`, body)
  }

  deleteQuackById(id: number) {
    return this.http.delete(`${this.baseURL}/api/tweet/${id}`)
  }

  likeQuack(id: number): Observable<any> {
    let user = this.userService.getActiveUser()
    let body = {
      quackid: id,
      uid: user.id
    }
   return this.http.put(`${this.baseURL}/api/tweet/like`, body)
  }

  repostQuack(id: number): Observable<any> {
    let user = this.userService.getActiveUser()
    let body = {
      qId: id,
      uId: user.id
    }
   return this.http.put(`${this.baseURL}/api/tweet/repost`, body)
  }

  getQuacksByUser(id: number) {
    let body = {
      uId: id
    }
    return this.http.post(`${this.baseURL}/api/getQuacks`, body)

  }

  getLikedQuacksByUser(user) {
    let body = {
      uId: user.id
    }
    return this.http.post(`${this.baseURL}/api/getlikes`, body)
  }
getFollowedQuacks():Observable<any>{
  let body= {
    uId: this.userService.getActiveUser().id
  }
  return this.http.post(`${this.baseURL}/api/followedquacks`,body)
}

  getFollowersUsersByUser(user) {
let body={
  uId: user.id
}
return this.http.post(`${this.baseURL}/api/followers`, body)
  }
}
