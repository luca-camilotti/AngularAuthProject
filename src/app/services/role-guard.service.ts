import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service.service';
import { MessageService } from './message.service';
import { TokenStorageService } from './token-storage.service';

/* 

See this reference:
https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
Install:
npm install --force --save jwt-decode
*/

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public authService: AuthService, 
    public router: Router, 
    public tokenService: TokenStorageService,
    public UImessageService: MessageService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {    // this will be passed from the route config    
    const expectedRole = route.data.expectedRole;  // get the expected role on the data property  
    const token = this.tokenService.getToken();    // decode the token to get its payload
    const tokenPayload = this.jwtHelper.decodeToken(token); // or simply tokenPayload = decode(token)
    let hasRole : boolean = false;
    let UImessage = 'Error: you don\'t have the necessary authorization to access this resource. The role '+expectedRole+' is needed';
    // Debug:
    // console.log('Token: '+token);
    // console.log('Decoded token: '+JSON.stringify(tokenPayload));        
    // console.log('Roles: '+tokenPayload['roles']);
    if(tokenPayload && tokenPayload['roles']) {  // Check role
      tokenPayload['roles'].forEach((role) => {
        // console.log('Role check: '+role);
        if(role  == expectedRole) {
          hasRole = true;
          UImessage = "Error: authentication has expired"; // user has role, so the only possible issue is with token expiration
        }
      })
    }  
    if (!this.authService.isAuthenticated() || !hasRole) {
      this.router.navigate([environment.appLogin]);
      this.UImessageService.sendMessage(UImessage);
      return false;
    }
    return true;
  }

}
