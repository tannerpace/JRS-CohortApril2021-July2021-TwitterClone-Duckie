import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public static readonly SERVER_URL = "http://localhost:8080"

  constructor() { }
}
