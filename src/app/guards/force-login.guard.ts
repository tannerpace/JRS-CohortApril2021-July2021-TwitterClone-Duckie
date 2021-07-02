import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ForceLoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isValid()) {
      console.log("log in validated")
      return true;
    } else {
      console.log("forcing login")
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
