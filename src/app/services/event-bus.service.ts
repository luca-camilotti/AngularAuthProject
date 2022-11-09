import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventData } from '../models/event-data.model';

@Injectable({
  providedIn: 'root'
})

/* This service will dispatch logout event to App 
   component when response status tells us 
   the access token is expired and refresh token too. */

export class EventBusService {
  private subject$ = new Subject<EventData>();

  constructor() { }

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }
}

