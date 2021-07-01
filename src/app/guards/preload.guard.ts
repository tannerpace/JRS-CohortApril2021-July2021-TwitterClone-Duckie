import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreloadGuard implements Resolve<any> {

  constructor(private http: HttpClient,
    private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> {
      const userName = route.paramMap.get('userName')
      const baseUrl = HttpService.SERVER_URL;
      
      return this.http.get(`${baseUrl}/api/user/${userName}`)
        .pipe(
          tap( // Log the result or error
            (data) => {
              //do nothing with data
              console.log(data)
            },
            (error) => {
              console.log("ERROR: there was an error.");
            }
          )
        );
  }
}


// (err: any, caught: Observable<Object>) => void
// (err: any, caught: Observable<Object>) => ObservableInput<any>