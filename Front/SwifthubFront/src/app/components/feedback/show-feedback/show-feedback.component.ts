import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
  addFeedbackForm!: FormGroup;

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
feedback:Feedback={
    feedback_id: '',
    description: "",
    rating: RatingType.Great,
    creationDate: new Date(),
    userId: this.LoggedInUser.id,
    workshop:this.workshop,
  };




  constructor(
    private feedbackService:FeedbackService,
    private workshopService:WorkshopService,
    private messageService:MessageService){}


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
  this.initializeForm();
  
    
  }

  //////add feedback
  initializeForm(){
    //  add feedback form
    this.addFeedbackForm=new FormGroup({
      description : new FormControl(this.feedback.description,Validators.required),
      rating: new FormControl(this.feedback.rating,Validators.required),
      creationDate: new FormControl(this.feedback.creationDate),
      userId: new FormControl(this.feedback.userId),
      workshop: new FormControl(this.feedback.workshop),
    });
    }
  
     //getters
   get description(){return this.addFeedbackForm.get('description')};
   get rating(){return this.addFeedbackForm.get('rating')};
  
   //submit feedback
  submitFeedback() {
    if (this.addFeedbackForm.valid) {
      const formData={
        ...this.addFeedbackForm.value,
        workshop: this.workshop
      }
    this.feedbackService.addFeedback(formData).subscribe(
      res=>{
        this.messageService.add({severity:'success', summary:'Success', detail:'Feedback added successfully'});
        this.addFeedbackCheck=false;
        this.showfeedback(this.workshopId);
        
      },
      err=>{
        console.log(err);
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add feedback'});
  
        
      }
          );
  
  
      }
  

}

}
