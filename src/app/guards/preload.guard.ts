import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PreloadGuard implements Resolve<any> {

  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> {
      const userName = route.paramMap.get('userName')
      
      return this.userService.getUserByUserName(userName)
        .pipe(
          tap( // Log the result or error
            (data) => {
              //do nothing with data
              console.log(data)
            },
            (error) => {
              console.error("ERROR: there was an error: ", error);
            }
          )
        );
  }
}


// (err: any, caught: Observable<Object>) => void
// (err: any, caught: Observable<Object>) => ObservableInput<any>