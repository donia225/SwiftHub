import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user/user';
import { UserService as userConnected} from 'src/app/services/users/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /*user: any = {
    id: 1,
    username: 'utilisateur123',
    email: 'utilisateur123@example.com',
    password:'hahaha',
    className:'4ARCTIC7',
    department:'info',
    managedService:'inf',
    role:'student',
    ImageUrl:'alees44.jpg',
  };*/


  LoggedInUser!:User;

  constructor(private userServiceConnected: userConnected, private _http: HttpClient , private router: Router,) {}

  
/*
  isStudentRoute() {
    return this.router.url === '/home/workshop'
  }
  // show html for admins+professors: BackOffice
  isAdminRoute() {
    return this.router.url === '/workshopBack/show';

  }
  */

  getUser() {
         //fetch local storage
  var email= window.localStorage.getItem("email");
  console.log(email);
  if (email ) {
 
    this.userServiceConnected.findUserByEmail(email).subscribe(
      res=>{
     this.LoggedInUser=res as User;   
     console.log(this.LoggedInUser);
     
      },
      err=>{
        console.log(err);
        
      }
    );
  }
    return this.LoggedInUser;
  }


  getUserByRole(): Observable<any> {
    return this._http.get(`http://52.228.158.147:8050/api/user/findd/PROFESSOR`);
  }

  getUserById(id: string): Observable<any> {
    return this._http.get(`http://52.228.158.147:8050/api/user/find/${id}`);
  }


}
