import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { QuackApiService } from '../services/quack-api.service';

@Injectable({
  providedIn: 'root'
})
export class PreloadQuackGuard implements Resolve<any> {
  
  constructor(private quackApiService: QuackApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> {
      const quackId = Number(route.paramMap.get('id'))
      
      return this.quackApiService.getQuackById(quackId)
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
