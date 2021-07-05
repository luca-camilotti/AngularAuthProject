import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

// Logger Service

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  log(msg: any) {
    if(environment.debug)  // log to console only in debug mode
        console.log(new Date() + ": " + JSON.stringify(msg));
  }
}
