import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
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

    const userName = route.paramMap.get('userName');
    if (!this.isAuthenticated(userName)) {
      this.router.navigate([userName]);
      return false;
    } else {
      return true;
    }
  }
  
  public isAuthenticated(userName: string): boolean {
    // the signed in user is allowed to access their own pages
    return userName == this.userService.getActiveUser().userName;
  }
  
}
