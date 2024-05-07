import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Workshop } from 'src/app/models/workshop/workshop';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styleUrls: ['./edit-workshop.component.scss']
})
export class EditWorkshopComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  workshopId: any;
  workshop!: any;
  presenceType: string = 'inPerson';
  endDateInvalid!: boolean;
  formData!:Workshop;


  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
     private workshopService: WorkshopService,
      private datePipe: DatePipe,
       private messageService: MessageService) {}

  stateOptions: any[] = [
    { label: 'In-Person', value: 'inPerson' },
    { label: 'Online', value: 'online' }
  ];

  //format date
  formatDate(dateString: string): Date {
    // Assuming dateString is in the format: Tue Apr 23 2024 00:00:00 GMT+0200 (Central European Summer Time)
    const date = new Date(dateString);
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate ? new Date(formattedDate) : new Date();
  }

  //chech date range validity
  checkDateValidity() {
    const endDate = new Date(this.workshop.end_date);
    const startDate = new Date(this.workshop.start_date);
    this.endDateInvalid = endDate <= startDate;
  }





  //updateWorkshop
  updateWorkshop() {

    var formData = {
      workshop_id: this.workshop.workshop_id,
      title: this.workshop.title,
      description: this.workshop.description,
      location: this.workshop.location,
      link: this.workshop.link,
      capacity: this.workshop.capacity,
      start_date: this.formatDate(this.workshop.start_date),
      end_date: this.formatDate(this.workshop.end_date),
      userId: this.workshop.userId,
      feedbacks: this.workshop.feedbacks,
      joinedUsers:this.workshop.joinedUsers,
      meetingId:this.workshop.meetingId

    }


    this.workshopService.updateWorkshop(this.workshopId, formData).subscribe(
      res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Workshop updated successfully'});
        setTimeout(() => {
          this.router.navigateByUrl("/workshopBack/show")
        }, 900);

      },
      err => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to update workshop'});

      }
    );
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'dashboard', routerLink: '/dashboard' },
      { label: 'workshops', routerLink: '/workshopBack/show' },
      { label: 'edit' }
    ];
    //get workshop
    this.workshopId = this.activatedRoute.snapshot.paramMap.get('id');
    this.workshopService.getWorkshopById(this.workshopId).subscribe(
      res => {
        this.workshop = res;
      },
      error => {
        console.error('Error fetching workshop:', error);
      }
    );

    //update workshop
    this.updateWorkshop();










  }






}
