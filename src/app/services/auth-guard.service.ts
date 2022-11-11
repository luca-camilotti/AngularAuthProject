import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service.service';

/*
AuthGuard service.
See this reference:
https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
*/

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate([environment.appLogin]);
      return false;
    }
    return true;
  }
}
