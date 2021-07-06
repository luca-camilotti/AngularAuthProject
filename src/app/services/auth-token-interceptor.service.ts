import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from './state.service';  // contains the user auth token
import {catchError} from 'rxjs/operators';
import { LogService } from './log.service';  // Log error message to console
import { MessageService } from './message.service';  // Show toast with error message 

@Injectable({
  providedIn: 'root'
})

/* This service intercept the http request before it goes to the server.
   The purpose of this interceptor is to add the authorization token (if user is logged)
   to the request headers.

   You must register the provider of interceptor in AppModule, inside @NgModule providers array:

   providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptorService, multi: true}]

    If there's more than one interceptor, they are applied in the order they appear in providers section.

*/

export class AuthTokenInterceptorService implements HttpInterceptor {

  constructor(private appState: StateService, private logger: LogService, private UImessage: MessageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    let token = this.appState.getState().getToken();  // retrieve token
    this.logger.log('AuthTokenInterceptorService: user '+this.appState.getState().getUser()+' has token '+token);
    
    // Create headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      //'WEB-API-key': environment.webApiKey,
      'Content-Type': 'application/json'
    });    
    const modifiedRequest = req.clone({headers});  // new modified request (including headers)
    return next.handle(modifiedRequest);
  }
}
