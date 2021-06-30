import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private subject = new Subject<any>();  // subject create a unique stream for all subscribers

  // Call this to send an error message:
  sendMessage(message: string) {
    this.subject.next(message );
  }

  clearMessages() {
    this.subject.next();
  }

  // Call this to get the observable:
  getMessage(): Observable<any> {
    return this.subject.asObservable();  // return observable to subscribe to
  }

  constructor() { }
}
