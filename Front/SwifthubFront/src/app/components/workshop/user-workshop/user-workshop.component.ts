import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/enums/role';
import { Meeting } from 'src/app/models/meeting/meeting';
import { User } from 'src/app/models/user/user';
import { Workshop } from 'src/app/models/workshop/workshop';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';

@Component({
  selector: 'app-user-workshop',
  templateUrl: './user-workshop.component.html',
  styleUrls: ['./user-workshop.component.scss']
})
export class UserWorkshopComponent implements OnInit {

  workshops!:Workshop[];
  users!:User[];
  showFeedback:boolean=false;
  selectedWorkshopId!: string;
  meeting!:Meeting;


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

  constructor(private workshopService: WorkshopService,private meetingService:MeetingService,private route: ActivatedRoute,private router:Router){}

  ngOnInit(): void {

    this.getUsers();
    this.WorkshopsByJoinedUser(this.LoggedInUser.id)

   }

  // Set the initial position of the feedback container
  feedbackContainerTop: number = 50;

  // Listen for scroll events and update the position of the feedback container
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.feedbackContainerTop = 50 + offset; // Adjust the initial offset as needed
  }

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

//  Workshops of logged in user
  WorkshopsByJoinedUser(userId: string){
    return this.workshopService.getWorkshopsByUser(userId).subscribe(
      res=>{
        this.workshops=res;
      },
      err=>{
        console.log(err);

      }
    );

  }
  //show feedbacks

  hideShow(workshopId: string){
    this.selectedWorkshopId = workshopId;
    this.showFeedback=!this.showFeedback;

  }

  //check start date is >= current date
  isValid(start: Date): boolean {
    const workshopstart=new Date(start)
    const currentDate = new Date();
    return workshopstart >= currentDate;
  }

  //disabling join meeting button
  meetingValidity(workshop:Workshop): boolean {
    const currentDate = new Date(Date.now());
    const startDate = new Date(workshop.start_date);
    const endDate = new Date(workshop.end_date);
    return currentDate>=startDate&&currentDate<=endDate;
  }

  studentJoinMeeting(meetingId:string) {
    this.meetingService.getMeetingById(meetingId).subscribe(
      res=>{
        this.meeting=res as Meeting;
        this.router.navigateByUrl('/meeting?roomID='+this.meeting.accessKey);
    },
    err=>{
      console.log(err);

    }
    );
    }


}
