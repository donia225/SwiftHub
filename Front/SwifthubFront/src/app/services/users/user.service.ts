import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user/user";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl: string = `${environment.API_URL1}/api/user`;

  constructor(private http: HttpClient) {
  }

  public getUsers() {
    return this.http.get(`${this.apiServerUrl}/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/update`, user);
  }

  public deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${userId}`);
  }

  public findUserBytoken(token: string){
    return this.http.get(`${this.apiServerUrl}/${token}`);
  }

  public findUserByEmail(email: string){
    return this.http.get(`${this.apiServerUrl}/email/${email}`);
  }


  public findUserByRole(role: string){
    return this.http.get(`${this.apiServerUrl}/findd/${role}`);
  }


}
