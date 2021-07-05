import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';  // for api url
import { StateService } from './state.service'
import { Observable } from 'rxjs';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private state:StateService, private readonly ApiUrl:string, private http:HttpClient, private logservice:LogService) {
    this.ApiUrl = environment.apiUrl;
  }

  /* Basic CRUD operation */

  // READ
  private get(resource:string, auth_token:string=null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    if(auth_token==null) {
      this.logservice.log('API: Unauthenticated get to resource '+resource)
      return this.http.get(this.ApiUrl+'/'+resource);
    }
    else {
      this.logservice.log('API: get to resource '+resource)
      return this.http.get(this.ApiUrl+'/'+resource, { headers: headers })
    }
  }

  // CREATE
  private post(resource:string, value:string, auth_token:string=null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    if(auth_token==null) {
      this.logservice.log('API: Unauthenticated get to resource '+resource)
      return this.http.post(this.ApiUrl+'/'+resource, value);
    }
    else {
      this.logservice.log('API: get to resource '+resource)
      return this.http.post(this.ApiUrl+'/'+resource, value, { headers: headers })
    }
  }

  // UPDATE
  private put(resource:string, value:string, auth_token:string=null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    if(auth_token==null) {
      this.logservice.log('API: Unauthenticated get to resource '+resource)
      return this.http.put(this.ApiUrl+'/'+resource, value);
    }
    else {
      this.logservice.log('API: get to resource '+resource)
      return this.http.put(this.ApiUrl+'/'+resource, value, { headers: headers })
    }
  }

  // DELETE
  private delete(resource:string, auth_token:string=null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    if(auth_token==null) {
      this.logservice.log('API: Unauthenticated get to resource '+resource)
      return this.http.delete(this.ApiUrl+'/'+resource);
    }
    else {
      this.logservice.log('API: get to resource '+resource)
      return this.http.delete(this.ApiUrl+'/'+resource, { headers: headers })
    }
  }

  /* END Basic CRUD operation */
}
