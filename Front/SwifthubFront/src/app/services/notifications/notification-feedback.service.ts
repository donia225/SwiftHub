import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
// import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
// import { Observable } from 'rxjs';

// export const url ='ws://localhost:8222/api/workshop/notif';

  export const wsUrl= 'ws://localhost:8222/api/workshop/notif'

@Injectable({
  providedIn: 'root'
})
export class NotificationFeedbackService {

  // protected url = `${environment.API_URL}/api/workshop/notif`;
  
  // private socket$: WebSocketSubject<any>;

  private stompClient: any;
  private returnedNotif!:Notification;

  constructor() {
    // this.socket$ = webSocket(this.wsUrl);
   }

   public connect(){
   return this.stompClient=Stomp.client(wsUrl);
    // this.stompClient.connect({}, (frame: any) => {
    //   console.log('Connected to Stomp');
    //   // Subscribe to the desired topic
    //   this.stompClient.subscribe('/topic/notification', (notification: any) => {
    //     // Process received notification
    //     console.log('Received notification:', JSON.parse(notification.body).message);
    //     this.returnedNotif=JSON.parse(notification.body).message;
       
    //   });
    // }, (error: any) => {
    //   console.error('Stomp connection error:', error);
    // });
    // return this.returnedNotif;
   }


  // oppening cnx with backendSocket 
  // public connect(){
    // let socket=new SockJS(url);
    // let stompClient=Stomp.over(socket)
  //  
    // return stompClient;
  // }


//   private socket$: WebSocketSubject<any> | null = null;
//  // Open connection with backendSocket
//  public connect(): void {
//   this.socket$ = webSocket(wsUrl);
//   this.socket$.subscribe(
//     (notification: any) => {
//       // Process received notification
//       console.log('Received notification:', notification.message);
//     },
//     (error: any) => {
//       console.error('WebSocket connection error:', error);
//     }
//   );


}



