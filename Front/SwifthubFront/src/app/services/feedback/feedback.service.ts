import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from 'src/app/models/feedback/feedback';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  protected baseUrl = `${environment.API_URL}/api/workshop/feedbacks`;
  constructor(private http:HttpClient) { }

   /**
   * getAllFeedbacks
   */
   public getAllFeedbacks() {
    return this.http.get<Feedback[]>(`${this.baseUrl}`);
  }
  
  /**
   * addFeedback
   */
  public addFeedback(feedback:Feedback) {
    return this.http.post(`${this.baseUrl}`,feedback);
  }




}
