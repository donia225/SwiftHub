import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any = {
    id: "BenLahouel",
    username: 'rzem',
    email: 'john.doe@example.com',
    password:'hashed_password',
    className:'Class 101',
    department:'IT',
    managedService:'Service XYZ',
    role:'PROFESSOR',
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
