import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enums/role';
import { Feedback } from 'src/app/models/feedback/feedback';
import { User } from 'src/app/models/user/user';
import { Workshop } from 'src/app/models/workshop/workshop';
import { NotificationFeedbackService } from 'src/app/services/notifications/notification-feedback.service';
import { UserService } from 'src/app/services/users/user.service';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';

@Component({
  selector: 'app-admin-show-feedback',
  templateUrl: './admin-show-feedback.component.html',
  styleUrls: ['./admin-show-feedback.component.scss']
})
export class AdminShowFeedbackComponent implements OnInit {

  notification: Notification| null=null;
  workshops!: Workshop[];
  users!:User[];
  selectedFeedback: Feedback | null = null;
  selectedWorkshop!:Workshop;
  loggedInUser!: User;

  constructor(
    private notifService: NotificationFeedbackService,
    private serviceWorkshop: WorkshopService,
    private userService:UserService

    ) { }

  ngOnInit(): void {
    //fetch local storage
  var email= window.localStorage.getItem("email");  
  if (email ) {
   this.userService.findUserByEmail(email).subscribe(
     res=>{
    this.loggedInUser=res as User; 
    this.getAllUsers();  
    this.showAdminWorkshops(this.loggedInUser.id); 
     },
     err=>{
       console.log(err);
       
     }
   );
 }

    //Notification
    // opening cnx with server socket 
    let stompClient = this.notifService.connect();
    stompClient.connect({}, (frame: any) => {
      //add notif to topic 
      stompClient.subscribe('/topic/notification', (notification: any) => {
        //get recent message 
        this.notification = JSON.parse(notification.body).message;
        setTimeout(() => this.notification = null, 3000);
        this.showAdminWorkshops(this.loggedInUser.id);
        
      })
    });


  }

  //get workshops by userId
  showAdminWorkshops(userId: string) {
    return this.serviceWorkshop.getWorkshopsByCreator(userId).subscribe(
      res => {
        this.workshops = res;
      },
      err => {
        console.log("error fetching workshops:" + err);

      }
    );
  }

  // Show selected feedbacks for a workshop
  showSelectedFeedback(workshop: Workshop) {
    this.selectedWorkshop = workshop;
    this.selectedFeedback = null; // Reset selected feedback
  }

  // Show details of the selected feedback
  showFeedbackDetails(feedback: Feedback) {
    this.selectedFeedback = feedback;
  }

  //getAllUsers
  getAllUsers(){
    return this.userService.getUsers().subscribe(
      res=>{
        this.users=res as User[];
      },
      err=>{
        console.log("couldn't fetch users: " + err);
        
      }
    );
  }
  
}


