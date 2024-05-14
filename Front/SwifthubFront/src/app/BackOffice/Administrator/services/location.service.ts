import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _http: HttpClient) { }


  addLocation(data: any): Observable<any> {
    console.log(data);
    return this._http.post('http://gateway-service:8222/api/appointments/location', data);
  }
  getLocationList(): Observable<any> {
    return this._http.get('http://gateway-service:8222/api/appointments/location');
  }
}
