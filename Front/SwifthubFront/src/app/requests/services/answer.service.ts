import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  protected url= environment.apiBaseUrl + '/answers';
  //readonly add = '/add-request';
  
  constructor(private httpclient: HttpClient) { 

  }

  public affectAnswerToreq(idRequest: number, Answer: any): Observable<any> {
    return this.httpclient.post(`${this.url}/${idRequest}`, Request);
  }
}
