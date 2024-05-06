import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  protected url= environment.apiBaseUrl + '/categories';

  constructor(private httpclient: HttpClient) { }

  public getAllCategories(): Observable<any> {
    console.log("Calling getAllcategories()...");
    return this.httpclient.get(`${this.url}`);
  }
}
