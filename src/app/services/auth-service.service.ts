import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // for api url
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './token-storage.service';
import { EventData } from '../models/event-data.model';
import { EventBusService } from './event-bus.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

/*
This service performs authentication and
resfresh token.
It also contains a method that returns
true if the use is authenticated. See this reference:
https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
Use JwtHelperService class from angular2-jwt.
Install:
npm install --force --save @auth0/angular-jwt

*/

export class AuthService {

  private readonly ApiUrl:string;
  private readonly loginPath:string;
  private readonly registerPath:string;
  private readonly refreshTokenPath:string;

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient,      
    public tokenService: TokenStorageService,
    public eventBusService: EventBusService) { 
    this.ApiUrl = environment.baseUrl+environment.apiPath;
    this.loginPath = environment.loginPath;
    this.registerPath = environment.registerPath;
    this.refreshTokenPath = environment.refreshtokenPath;
  }

  // Login
  login(username: string, password: string): Observable<any> {

    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(this.ApiUrl + this.loginPath, body, options);
  }

  // Register
  register(username: string, email: string, password: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('email', email);
    body.set('password', password);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post(this.ApiUrl + this.registerPath, body, options );
  }
  
  // Refresh token
  refreshToken(token: string) {
    return this.http.post(this.ApiUrl + this.refreshTokenPath, {
      refreshToken: token
    }, httpOptions);
  }

  // Check if a user is authenticated
  public isAuthenticated(): boolean {
    // Check whether the refresh token is expired and return 
    const token = this.tokenService.getRefreshToken();    
    
    if(!token || this.jwtHelper.isTokenExpired(token)) {
      this.eventBusService.emit(new EventData('logout', null));  // send logout signal
      this.tokenService.signOut();    // sign out
      return false;
    }
    return true;
  }
}
