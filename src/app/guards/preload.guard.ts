import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PreloadGuard implements Resolve<any> {

  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> {
      const username = route.paramMap.get('username')
      const baseUrl = HttpService.SERVER_URL;
      console.log
      console.log(`${baseUrl}/api/user/${username}`)
      return this.http.get(`${baseUrl}/api/user/${username}`);
  }
  
}
