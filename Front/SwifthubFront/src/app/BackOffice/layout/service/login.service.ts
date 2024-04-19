import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../../Model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private baseUrl = "http://localhost:8081/login";
 constructor(private httpClient: HttpClient) { }

 login(LoginModel: Login): Observable<string> {
  console.log(LoginModel);
  return this.httpClient.post("http://localhost:8081/login", LoginModel, { responseType: 'text' })
    .pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError('Login failed. Please check your credentials.');
      })
    );
}

 
}