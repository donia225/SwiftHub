import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AvailabilityServiceService {

  constructor(private _http: HttpClient) { }


  getAvailabilityrByUser(id:string): Observable<any> {
    return this._http.get(`http://gateway-service:8222/api/appointments/availability/${id}`);
  }

  updateReservedStatus(teacherId: string, start: string , end: string): Observable<any> {
    const startDateParts = start.split('T');
    const startTime = startDateParts[1].split('.')[0].slice(0, -3); // Supprime les trois derniers caractères
    const formattedStartDate = `${startDateParts[0]}T${startTime}`;

    const endDateParts = end.split('T');
    const endTime = endDateParts[1].split('.')[0].slice(0, -3); // Supprime les trois derniers caractères
    const formattedEndDate = `${endDateParts[0]}T${endTime}`;
    console.log(formattedStartDate + 'hihi' + formattedEndDate+ '    '+teacherId)
    return this._http.put(`http://gateway-service:8222/api/appointments/availability/${teacherId}/${formattedStartDate}/${formattedEndDate}`, {});

  }
}
