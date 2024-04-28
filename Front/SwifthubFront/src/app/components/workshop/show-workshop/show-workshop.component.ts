import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Role } from 'src/app/enums/role';
import { User } from 'src/app/models/user/user';
import { Workshop } from 'src/app/models/workshop/workshop';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';

@Component({
  selector: 'app-show-workshop',
  templateUrl: './show-workshop.component.html',
  styleUrls: ['./show-workshop.component.scss']
})
export class ShowWorkshopComponent implements OnInit {


  displyDialogDelete: boolean = false;
  breadcrumbItems: MenuItem[] = [];
  workshops!: Workshop[];
  users!: User[];
  joinedUsers!:string[];
  selectedWorkshopId: string | null = null;

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

  constructor(public serviceWorkshop: WorkshopService, public router: Router, private confirmationService: ConfirmationService, private messageService: MessageService,private datePipe: DatePipe) { }

  //show html for students: frontOffice
  isStudentRoute() {
    return this.router.url === '/home/workshop'
  }
  // show html for admins+professors: BackOffice
  isAdminRoute() {
    return this.router.url === '/workshopBack/show';

  }


  //  get workshops
  getWorkshops() {
    this.serviceWorkshop.getAllWorkshops().subscribe(
      res => {
        this.workshops = res;


      },
      err => {
        console.log(err);

      }
    );
  }

  //getUsersList
  getUsers() {
    this.serviceWorkshop.getAllUsers().subscribe(
      (res) => {
        this.users = res;
      },
      err => {
        console.log(err);
      }
    );
  }
////// BackOffice funtions
  // delete workshop
  cancelDelete() {
    this.selectedWorkshopId = null;
  }

  deleteWorkshop(workshopId: string) {
    this.selectedWorkshopId = workshopId;
    this.confirmationService.confirm({
      header: 'deleting workshop',
      message: 'Are you sure ?',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        if (this.selectedWorkshopId != null) {
          this.serviceWorkshop.deleteWorkshop(this.selectedWorkshopId).subscribe(
            () => {
              console.log("delete success");
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have confirmed deletion', life: 3000 });
              this.selectedWorkshopId = null;
              setTimeout(() => {
                this.getWorkshops();
              }, 1000);
            },
            err => {
              console.log("error deleting workshop:" + err);
            }
          );
        }
      },
      reject: () => {
        this.cancelDelete();
        this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: 'You have cancelled deletion', life: 3000 });
      }
    });
  }
////// FrontOffice funtions
  //only Show workshops that haven't started yet
  checkStartDate(start:Date):boolean{
    const workshopstart=new Date(start)
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate()-3);
    return workshopstart >= currentDate;
  }

  joinWorkshop(workshopId:string){
    var userId:string=this.LoggedInUser.id
    this.serviceWorkshop.joiningWorkshop(workshopId,userId).subscribe(
      (res)=>{        
        if (res==true) {
          this.messageService.add({severity:'success', summary:'Success', detail:'You Have Joined this workshop'});
        }else if(res== false){
          this.messageService.add({severity:'info', summary:'Already Joined', detail:'You have already Joined this workshop'});

        }
      },
      err=>{
        this.messageService.add({severity:'error', summary:'Failed', detail:'ERROR, couldnt join workshop'});

      }
    );
  }


  
 

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'dashboard', routerLink: '/dashboard' },
      { label: 'workshops' }
    ];

    this.getUsers();
    this.getWorkshops();
    
    




  }

}
