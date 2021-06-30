import { Injectable } from '@angular/core';

// Logger Service

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  log(msg: any) {
    console.log(new Date() + ": " + JSON.stringify(msg));
  }
}
