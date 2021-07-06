import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { LogService } from './log.service';  // Log error message to console
import { MessageService } from './message.service';  // Show toast with error message 

@Injectable({
  providedIn: 'root'
})
/* This service intercept the response before it goes to UI.
   The purpose of this interceptor is to show the error message
   received from the server in the UI (i.e. display toast and/or log to console).

   You must register the provider of interceptor in AppModule, inside @NgModule providers array:

   providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true}]

   If there's more than one interceptor, they are applied in the order they appear in providers section.

*/
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private logger: LogService, private UImessage: MessageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          this.logger.log('HttpErrorInterceptor: response status '+err.status+' ('+err.statusText+'), error '+err.error.message+', '+err.message);
          this.UImessage.sendMessage(err.status+' ('+err.statusText+'), error: '+err.error.message+', '+err.message);
          return throwError(err);
        }
      )  // end catchError        
    ) // end pipe
    /*
    .pipe(
      catchError( (err: HttpErrorResponse) => 
      {
        this.logger.log(`Logging Interceptor: ${err.error.message}`);
        return of(new HttpResponse({body:{message: err.error.message}}));
      })
    ); */
  }
}
