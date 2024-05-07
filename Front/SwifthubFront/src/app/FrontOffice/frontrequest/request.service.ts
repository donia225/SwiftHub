import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

 
  protected url= environment.apiBaseUrl + '/requests';
  readonly add = '/add-request';

  constructor(private httpclient: HttpClient) { }

  public getAllRequests(): Observable<any> {
    console.log("Calling getAllrequests()...");
    return this.httpclient.get(`${this.url}`);
  }

  searchRequests(searchText: string): Observable<any[]> {
    const params = new HttpParams().set('searchText', searchText);
    return this.httpclient.get<any[]>(`${this.url}/search`, { params });
  }

  public getRequestById(idRequest:number):Observable<any>{
    return this.httpclient.get(`${this.url}/${idRequest}`);
  }

  public addRequest(Request: any): Observable<any> {
    return this.httpclient.post(`${this.url}${this.add}`, Request);
  } 


  public addCategoryToRequest(idCategory: number, Request: any): Observable<any> {
    return this.httpclient.post(`${this.url}/${idCategory}`, Request);
  } 

  public updaterequest(idRequest: number, Request: any): Observable<any> {
    return this.httpclient.put(`${this.url}/update/${idRequest}`, Request);
  }
  
  public deleterequest(idRequest:number):Observable<any>{
    return this.httpclient.delete(`${this.url}/${idRequest}`);
  }
}
