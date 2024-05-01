import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meeting } from 'src/app/models/meeting/meeting';
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

  /**
   * getMeetingById
  */
  public getMeetingById(meetingId:String) {
    return this.http.get<Meeting>(`${this.baseUrl}/`+meetingId);
  }
}
