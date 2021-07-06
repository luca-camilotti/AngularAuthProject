import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Appstate } from '../models/appstate.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  // This service provide the current application state as observable
  
  // Here BehaviorSubject will be used as observable. Unlike Subject,
  // BehaviorSubject will always return the last pushed value to subscriber,
  // even if the subscription was made after the last value was pushed.

  constructor() { }

  // Make _stateSource private so it's not accessible from the outside, 
  // expose it as state$ observable (read-only) instead.
  // Write to _stateSource only through specified store methods below.
  private readonly _stateSource = new BehaviorSubject<Appstate>(new Appstate());

  // Exposed observable (read-only).
  readonly state$ = this._stateSource.asObservable();

  // Get last value without subscribing to the state$ observable (synchronously).
  getState(): Appstate {
    return this._stateSource.getValue();
  }

  // Push a new application state
  setState(state: Appstate): void {
    this._stateSource.next(state);
  }

}
