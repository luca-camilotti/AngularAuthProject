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

  private readonly ApiUrl:string
  
  constructor(private state:StateService, private http:HttpClient, private logger:LogService) {
    this.ApiUrl = environment.baseUrl+environment.apiPath;
    this.logger.log('API Service: api url = '+this.ApiUrl)
  }

  /* Basic CRUD operation */
  // READ
  get(resource:string): Observable<any> {
    this.logger.log('API: GET resource '+resource)
    return this.http.get(this.ApiUrl+resource)    
  }
  // CREATE
  post(resource:string, value:string): Observable<any> {  
    this.logger.log('API: POST '+value+' to resource '+resource)
    return this.http.post(this.ApiUrl+resource, value)
  }
  // UPDATE
  put(resource:string, value:string): Observable<any> {
    this.logger.log('API: PUT '+value+' to resource '+resource)
    return this.http.put(this.ApiUrl+resource, value)    
  }
  // DELETE
  delete(resource:string): Observable<any> {
    this.logger.log('API: DELETE resource '+resource)
    return this.http.delete(this.ApiUrl+resource)
  }
  /* END Basic CRUD operation */
}
