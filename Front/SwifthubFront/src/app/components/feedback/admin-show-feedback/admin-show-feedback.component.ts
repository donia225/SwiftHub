// import { Component, OnInit } from '@angular/core';
// import { Notification } from 'src/app/models/feedbackNotification/notification';
// import { NotificationFeedbackService } from 'src/app/services/notifications/notification-feedback.service';

// @Component({
//   selector: 'app-admin-show-feedback',
//   templateUrl: './admin-show-feedback.component.html',
//   styleUrls: ['./admin-show-feedback.component.scss']
// })
// export class AdminShowFeedbackComponent implements OnInit {

//   notification!:Notification;
//   constructor(private notifService:NotificationFeedbackService){}

//   ngOnInit(): void {
//     // opening cnx with server socket 
//     let stompClient= this.notifService.connect();
//     stompClient.connect({},()=>{
//       //add notif to topic 
//       stompClient.subscribe('/topic/notification', notifications=>{
//         //get recent message 
//         this.notification=JSON.parse(notifications.body).message;
//       })
//     });
//   }

  
 





// }
