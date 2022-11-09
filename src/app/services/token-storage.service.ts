import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user.model';
import { LocalStorageServiceService } from './local-storage-service.service';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

/*
This class stores tokens in the local storage.
It will be used during authentication.

Reference:
https://www.bezkoder.com/angular-12-jwt-auth/
https://www.bezkoder.com/angular-12-refresh-token/
https://www.bezkoder.com/angular-14-refresh-token/
*/
export class TokenStorageService {

  constructor(private localStorage: LocalStorageServiceService) { }

  
  signOut(): void {
    // window.sessionStorage.clear();
    this.localStorage.clearData();
  }

  public saveToken(token: string): void {
    // window.sessionStorage.removeItem(TOKEN_KEY);
    // window.sessionStorage.setItem(TOKEN_KEY, token);
    this.localStorage.removeData(TOKEN_KEY);
    this.localStorage.saveData(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    // return window.sessionStorage.getItem(TOKEN_KEY);
    return this.localStorage.getData(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    // window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    // window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
    this.localStorage.removeData(REFRESHTOKEN_KEY);
    this.localStorage.saveData(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    // return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
    return this.localStorage.getData(REFRESHTOKEN_KEY);
  }

  public saveUser(user: AppUser): void {
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.localStorage.removeData(USER_KEY);
    this.localStorage.saveData(USER_KEY, JSON.stringify(user));
  }

  public getUser(): AppUser | null {
    // const user = window.sessionStorage.getItem(USER_KEY);
    const user = this.localStorage.getData(USER_KEY)
    if (user) {  // if user is defined
      return JSON.parse(user);
    }
    return null;
  }
}
