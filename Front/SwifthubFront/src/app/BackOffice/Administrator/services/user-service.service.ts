import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any = {
    id: 1,
    username: 'utilisateur123',
    email: 'utilisateur123@example.com',
    password:'hahaha',
    className:'4ARCTIC7',
    department:'info',
    managedService:'inf',
    role:'student',
    ImageUrl:'alees44.jpg',
  };

  constructor(private _http: HttpClient) {}

  getUser() {
    return this.user;
  }


  getUserByRole(): Observable<any> {
    return this._http.get(`http://localhost:8050/api/user/findd/PROFESSOR`);
  }


}
