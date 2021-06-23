import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class QuackApiService {

  private baseURL: string;

  constructor() {
    this.baseURL = HttpService.SERVER_URL;
  }

  createQuack() {

  }

  deleteQuackById(id: number) {

  }

  likeQuack(id: number) {

  }

  repostQuack(id: number, whoLiked: User) {

  }

  getQuacksByUser(user: User) {

  }

  getAllQuacksAndCommentsByUser(user: User) {

  }

  getLikedQuacksByUser(user: User) {

  }

  getFollowedQuacksByUser(user: User) {

  }
}
