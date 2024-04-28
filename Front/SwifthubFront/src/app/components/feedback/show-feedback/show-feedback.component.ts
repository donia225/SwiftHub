import { Component, Input, OnInit } from '@angular/core';
import { RatingType } from 'src/app/enums/rating-type';
import { Role } from 'src/app/enums/role';
import { Feedback } from 'src/app/models/feedback/feedback';
import { User } from 'src/app/models/user/user';
import { Workshop } from 'src/app/models/workshop/workshop';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';

@Component({
  selector: 'app-show-feedback',
  templateUrl: './show-feedback.component.html',
  styleUrls: ['./show-feedback.component.scss']
})
export class ShowFeedbackComponent implements OnInit {

  @Input() workshopId: string="";
  
  workshop!:Workshop ;
  feedbacks!:Feedback[];
  users!:User[];
  addFeedbackCheck: boolean=false;


  //static logged in user
 LoggedInUser:User={
  id: '662bb68d6c4b2853ebe30870',
  username: 'ons',
  password: '$2a$10$xa.eJw6xfl7pAPopFQHTcezeCSsufmssLZ67Jck8md47Fw9l5l5/u',
  email: 'ons.hanafi2@gmail.com',
  className: 'Class A',
  department: 'Computer Science',
  managedService: 'IT Support',
  role: Role.STUDENT,
  ImageUrl: 'com.user.management.User.user.User'
 }
  constructor(private feedbackService:FeedbackService,private workshopService:WorkshopService){}


///////////////// DESGIN
  isItemInViewport(index: number): boolean {
    const element = document.querySelectorAll('.list-group-item')[index];
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

////////////////////////////////////////////////////
//getUsersList
  getUsers() {
    this.workshopService.getAllUsers().subscribe(
      (res) => {
        this.users = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  //get feedbacks by workshop
  showfeedback(id:string):void{
    this.workshopService.getWorkshopById(id).subscribe(
      res=>{
          this.workshop=res as Workshop;
          this.feedbacks=this.workshop.feedbacks;
         
      },
      err=>{
        console.log(err);
        
      }
    );
  }
  ///showing add feedback component
  openAddFeedbackModal() {
   return this.addFeedbackCheck=!this.addFeedbackCheck;
  }

  
  
  ngOnInit(): void {
  this.getUsers();
  this.showfeedback(this.workshopId);
  
    
  }

}
