import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enums/role';
import { User } from 'src/app/models/user/user';
import { Workshop } from 'src/app/models/workshop/workshop';
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

  constructor(private workshopService: WorkshopService){}

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

  ngOnInit(): void {

   this.getUsers();
   this.WorkshopsByJoinedUser(this.LoggedInUser.id)

   



  }

}
