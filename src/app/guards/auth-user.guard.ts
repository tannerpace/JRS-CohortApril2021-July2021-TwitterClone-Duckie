import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {

  constructor(public router: Router,
    public jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    console.log(!this.jwtHelper.isTokenExpired(token))
    return !this.jwtHelper.isTokenExpired(token);
  }
  
}
