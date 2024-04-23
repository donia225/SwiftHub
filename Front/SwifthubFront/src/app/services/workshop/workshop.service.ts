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

  /**
   * getWorkshopById
   */
  public getWorkshopById(workshopId:string) {
    return this.http.get(`${this.baseUrl}/`+workshopId);
  }

  /**
   * updateWorkshop
   */
  public updateWorkshop(workshopId:string,updatedWorkshop:Workshop) {
    return this.http.put(`${this.baseUrl}/update/${workshopId}`,updatedWorkshop);
  }

  /**
   * addWorkshop
   */
  public addWorkshop(workshop:Workshop) {
    return this.http.post(`${this.baseUrl}`,workshop);
    
  }
  
}
