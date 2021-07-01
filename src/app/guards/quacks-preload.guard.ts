import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QuackApiService } from '../services/quack-api.service';

@Injectable({
  providedIn: 'root'
})
export class QuacksPreloadGuard implements Resolve<any> {

  constructor(private quackApiService: QuackApiService,
    private http: HttpClient) {}
  
  resolve (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any>{
      
      var userName = route.paramMap.get('userName');
      if(userName) {
        console.log("there is a user name here")
      } else {
        userName = state.url.slice(1, state.url.indexOf("/", 1))
      }
      
      const FEED_TYPES = {
        FOLLOWING: 0,
        QUACKS: 1,
        REPLIES: 2,
        MEDIA: 3,
        LIKES: 4
      }

      switch (route.data.feedType) {
        case FEED_TYPES.FOLLOWING:
          return this.quackApiService.getFollowedQuacks(userName).pipe(
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
        case FEED_TYPES.QUACKS:
          console.log("attempting to get data")
          this.http.get(`http://localhost:8080/api/quacks/${userName}`)
          .subscribe( // Log the result or error
              (data) => {
                //do nothing with data
                console.log("got data from preload:", data)
                // return of (data);
              },
              (error) => {
                console.log("ERROR: there was an error.");
              }
            
          );
        case FEED_TYPES.REPLIES:
          return this.quackApiService.getQuacksAndRepliesByUser(userName);
        case FEED_TYPES.MEDIA:
          console.log("media?")
          // return this.quackApiService.getMediaQuacksByUser(userName);
        case FEED_TYPES.LIKES:
          return this.quackApiService.getLikedQuacksByUser(userName);
        default:
          console.log("preforming default")
          return of ([]);
          break;
      }
  }
  
}
