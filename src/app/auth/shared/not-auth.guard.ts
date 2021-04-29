import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser) {
      this.router.navigate(['/error/forbidden']);
      return false;
    }

    return true;
  }
}
