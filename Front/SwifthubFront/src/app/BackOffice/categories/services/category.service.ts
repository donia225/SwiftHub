import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  protected url = environment.apiBaseUrl + '/categories';
  readonly add = '/add-category';

  constructor(private httpclient: HttpClient) { }

  public getAllCategories(): Observable<any> {
    console.log("Calling getAllCategories()...");
    return this.httpclient.get(`${this.url}`);
  }

  public getCategoryById(idCategory:number):Observable<any>{
    return this.httpclient.get(`${this.url}/${idCategory}`);
  }

  public addCategory(Category: any): Observable<any> {
    return this.httpclient.post(`${this.url}${this.add}`, Category);
  }


  public deleteCategory(idCategory:number):Observable<any>{
    return this.httpclient.delete(`${this.url}/${idCategory}`);
  }

}