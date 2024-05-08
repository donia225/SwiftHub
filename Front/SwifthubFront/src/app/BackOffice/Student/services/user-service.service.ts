import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user/user';
import { UserService as userConnected} from 'src/app/services/users/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  LoggedInUser!: User ;

  

  constructor(private userServiceConnected: userConnected, private _http: HttpClient) {}

  getUser() {
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
    return this._http.get(`http://localhost:8050/api/user/findd/PROFESSOR`);
  }

  getUserById(id: string): Observable<any> {
    return this._http.get(`http://localhost:8050/api/user/find/${id}`);
  }

 

}
