import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {

  constructor(public router: Router,
    public userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {

    const username = route.paramMap.get('username');
    if (!this.isAuthenticated(username)) {
      this.router.navigate([username]);
      return false;
    } else {
      return true;
    }
  }
  
  public isAuthenticated(username: string): boolean {
    // the signed in user is allowed to access their own pages
    return username == this.userService.getActiveUser().userName;
  }
  
}
