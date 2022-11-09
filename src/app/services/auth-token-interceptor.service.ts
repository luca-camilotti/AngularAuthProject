import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { StateService } from './state.service';  // contains the user auth token
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import { LogService } from './log.service';  // Log error message to console
import { MessageService } from './message.service';  // Show toast with error message 
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';  // for api url
import { AuthService } from './auth-service.service';
import { EventBusService } from './event-bus.service';
import { EventData } from '../models/event-data.model';



/* This service intercept the http request before it goes to the server.
   The purpose of this interceptor is to add the authorization token (if user is logged)
   to the request headers.

   You must register the provider of interceptor in AppModule, inside @NgModule providers array:

   providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptorService, multi: true}]

    If there's more than one interceptor, they are applied in the order they appear in providers section.

*/

const TOKEN_HEADER_KEY = 'Authorization';  // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';    // for Node.js Express back-end

@Injectable({
  providedIn: 'root'
})

export class AuthTokenInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private appState: StateService, 
    private logger: LogService, 
    private UImessage: MessageService, 
    private tokenService: TokenStorageService, 
    private authService: AuthService,
    private eventBusService: EventBusService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    // let token = this.appState.getState().getToken();  // retrieve token
    // this.logger.log('AuthTokenInterceptorService: user '+this.appState.getState().getUser()+' has token '+token);
    /*
    // Create headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      //'WEB-API-key': environment.webApiKey,
      'Content-Type': 'application/json'
    });    
    const modifiedRequest = req.clone({headers});  // new modified request (including headers)
    return next.handle(modifiedRequest); original
    */

    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null && token.length > 0) {
      this.logger.log('AuthTokenInterceptorService: user '+(this.tokenService.getUser() && this.tokenService.getUser().username) ?this.tokenService.getUser().username : ''+' has token '+token);
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes(environment.loginPath) && error.status === environment.tokenExpired) {
        return this.handle401Error(authReq, next);  // Handle unauthorized request -> refresh token
      }
      return throwError(error);
    })) as Observable<HttpEvent<any>>;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();  // get the refresh token

      if (token)
        return this.authService.refreshToken(token).pipe( // send request for a new auth token
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.tokenService.saveToken(token.accessToken);  // save new auth token
            this.refreshTokenSubject.next(token.accessToken);
            
            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {  // refresh token has expired
            this.isRefreshing = false;

            /*
            if (err.status == environment.sessionExpired) {
              this.eventBusService.emit(new EventData('logout', null));
            } */
            this.UImessage.sendMessage("Session expired!");
            this.logger.log("AuthTokenInterceptorService: Session expired!");
            this.eventBusService.emit(new EventData('logout', null));  // send logout signal
            this.tokenService.signOut();    // sign out
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

    /* for Node.js Express back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
  }
}

/*
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]; */

