import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  protected baseUrl = `${environment.API_URL}/api/workshop/meetings`;

  constructor(private http:HttpClient) { }

  /**
   * addMeeting
   */
  public addMeeting() {
    return this.http.post(this.baseUrl,{});
    
  }
}
