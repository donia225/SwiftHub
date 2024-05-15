import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AvailabilityServiceService {

  constructor(private _http: HttpClient) { }


  getAvailabilityrByUser(id:string): Observable<any> {
    return this._http.get(`http://52.228.152.99:8222/api/appointments/availability/${id}`);
  }

  updateReservedStatus(availabilityId: string, timeSlotId: string): Observable<any> {
    return this._http.put(`http://52.228.152.99:8222/api/appointments/availability/${availabilityId}/timeslot/${timeSlotId}`, {});
  }
}
