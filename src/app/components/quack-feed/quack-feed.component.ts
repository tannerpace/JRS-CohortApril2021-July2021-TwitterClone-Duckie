import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quack } from 'src/app/models/quack.model';
import { User } from 'src/app/models/user.model';
import { QuackApiService } from 'src/app/services/quack-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'quack-feed',
  templateUrl: './quack-feed.component.html',
  styleUrls: ['./quack-feed.component.css']
})
export class QuackFeedComponent implements OnInit {

  @Input() quacks: Quack[] | any = [];
  @Input() user: User; // who is looking at this feed? the active user?
  @Input() feedType: number; // defined in FEED_TYPES enum

  constructor(private quackApiService: QuackApiService, private userService: UserService) { }

  ngOnInit(): void {
    
   


    var userName = this.user.userName;

    const FEED_TYPES = {
      FOLLOWING: 0,
      QUACKS: 1,
      REPLIES: 2,
      MEDIA: 3,
      LIKES: 4
    }

    switch (this.feedType) {
      case FEED_TYPES.FOLLOWING:
        this.quackApiService.getFollowedQuacks(userName)
          .subscribe(
            // Log the result or error
            (data) => {
              this.quacks = data;
            },
            (error) => {
              console.error("ERROR: there was an error getting quacks: ", error);
              this.quacks = [];
            }
          );
        break;
      case FEED_TYPES.QUACKS:
        this.quackApiService.getQuacksByUser(userName)
          .subscribe(
            // Log the result or error
            (data) => {
              //do nothing with data
              this.quacks = data;
            },
            (error) => {
              console.error("ERROR: there was an error getting quacks: ", error);
              this.quacks = [];
            }
          );
        break;
      case FEED_TYPES.REPLIES:
        this.quackApiService.getQuacksAndRepliesByUser(this.user.id)
          .subscribe(
            // Log the result or error
            (data) => {
              this.quacks = data;
              console.log(data)
            },
            (error) => {
              console.error("ERROR: there was an error getting quacks: ", error);
              this.quacks = [];
            }
          );
        break;
      case FEED_TYPES.MEDIA:
      // return this.quackApiService.getMediaQuacksByUser(userName);
      case FEED_TYPES.LIKES:
        this.quackApiService.getLikedQuacksByUser(userName)
          .subscribe(
            // Log the result or error
            (data) => {
              this.quacks = data;
            },
            (error) => {
              console.error("ERROR: there was an error getting quacks: ", error);
              this.quacks = [];
            }
          );
        break;
      default:
        console.warn("WARNING: there was an problem getting quacks");
        this.quacks = [];
        break;
    }
  }

}
