import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';



@Injectable({
  providedIn: 'root'
})
export class NotificationFeedbackService {

  protected wsUrl = `${environment.API_URL}/api/workshop/notif`;

  constructor() {

   }

  // oppening cnx with backendSocket 
  public connect(){
    let socket=new SockJS(this.wsUrl);
    let stompClient=Stomp.over(socket)
    return stompClient;
  }




}
