import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointementService {

  constructor(private _http: HttpClient) { }

  addEmployee(data: any): Observable<any> {
    console.log(data);
    return this._http.post('http://localhost:8222/api/appointments/appointment', data);
  }

  updateEmployee(data: any): Observable<any> {
    return this._http.put(`http://localhost:8222/api/appointments/appointment`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:8222/api/appointments/appointment');
  }
 
  getEmployeeById(id: string): Observable<any> {
    return this._http.get( `http://localhost:8222/api/appointments/appointment/${id}`);
  }

  deleteEmployee(id: string): Observable<any> {
    return this._http.delete(`http://localhost:8222/api/appointments/appointment/${id}`);
  }
}
