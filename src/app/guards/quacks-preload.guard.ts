import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { QuackApiService } from '../services/quack-api.service';

@Injectable({
  providedIn: 'root'
})
export class QuacksPreloadGuard implements Resolve<any> {

  constructor(private http: HttpClient,
    private quackApiService: QuackApiService) {}
  
  resolve (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any>{
      
      const userName = route.paramMap.get('username')
      const baseUrl = HttpService.SERVER_URL;

      console.log(userName, route)
      
      return this.quackApiService.getQuacksByUser(userName);
  }
  
}
