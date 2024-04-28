import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RatingType } from 'src/app/enums/rating-type';
import { Role } from 'src/app/enums/role';
import { Feedback } from 'src/app/models/feedback/feedback';
import { User } from 'src/app/models/user/user';
import { Workshop } from 'src/app/models/workshop/workshop';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { AddWorkshopComponent } from '../../workshop/add-workshop/add-workshop.component';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit{

  @Input()
  incomingWorkshopId!: string;

  workshop!:Workshop;
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
  addFeedbackForm!: FormGroup;
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
   private messageService:MessageService,
    private workshopService:WorkshopService,
    private router:Router,
  ){}

 ngOnInit(): void {
this.initializeForm();
this.getWorkshop();

}

 //workshop
 getWorkshop(){
  this.workshopService.getWorkshopById(this.incomingWorkshopId).subscribe(
    res=>{
      this.workshop=res as Workshop

    },
    err=>{
      console.log(err);
      
    }
  );
 }

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
      setTimeout(() => {
        this.router.navigateByUrl('/home/my-workshops');
      }, 700);
      // this.sharedDataService.updateFlag(true);
      
    },
    err=>{
      console.log(err);
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add feedback'});

      
    }
        );


    }
  }

}
