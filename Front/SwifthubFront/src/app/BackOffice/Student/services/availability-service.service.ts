import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AvailabilityServiceService {

  constructor(private _http: HttpClient) { }


  getAvailabilityrByUser(id:string): Observable<any> {
    return this._http.get(`http://localhost:8060/api/appointments/availability/${id}`);
  }

  updateReservedStatus(availabilityId: string, timeSlotId: string): Observable<any> {
    return this._http.put(`http://localhost:8060/api/appointments/availability/${availabilityId}/timeslot/${timeSlotId}`, {});
  }
}
