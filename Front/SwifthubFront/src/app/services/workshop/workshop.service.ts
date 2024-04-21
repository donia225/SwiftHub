import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workshop } from 'src/app/models/workshop/workshop';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  protected baseUrl = `${environment.API_URL}/api/workshop/workshops`;

  constructor(private http:HttpClient) { }

  /**
   * getAllWorkshops
   */
  public getAllWorkshops() {
    return this.http.get<Workshop[]>(`${this.baseUrl}`);
  }
  /**
   * deleteWorkshop
   */
  public deleteWorkshop(workshopId:string) {
    return this.http.delete(`${this.baseUrl}/delete/`+workshopId);
  }
}
