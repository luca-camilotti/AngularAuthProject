import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // for api url
import { LocalStorageServiceService } from './local-storage-service.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

/*
This service performs authentication and
resfresh token.
*/

export class AuthService {

  private readonly ApiUrl:string;
  private readonly loginPath:string;
  private readonly registerPath:string;
  private readonly refreshTokenPath:string;

  constructor(private http: HttpClient) { 
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
}
