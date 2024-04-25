import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Workshop } from 'src/app/models/workshop/workshop';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';

@Component({
  selector: 'app-add-workshop',
  templateUrl: './add-workshop.component.html',
  styleUrls: ['./add-workshop.component.scss']
})
export class AddWorkshopComponent implements OnInit {


  breadcrumbItems!: MenuItem[];
  workshop: Workshop = {
    workshop_id: "",
    title: "",
    description: "",
    capacity: 0,
    start_date: new Date(),
    end_date: new Date(),
    location: "",
    link: "",
    // static untill front token is set
    userId: "66218df95459d6419b2fec46",
    feedbacks: []
  };
  addWorkshopForm!: FormGroup;
  presenceType: string = 'InPerson';
  dateValidity!: boolean;




  constructor(private sw:WorkshopService,private datePipe: DatePipe,private messageService:MessageService,private router:Router) { }

  //options for workshop
  stateOptions: any[] = [
    { label: 'In-Person', value: 'inPerson' },
    { label: 'Online', value: 'online' }
  ];




  //getters for from 
  get title() { return this.addWorkshopForm.get('title') };
  get description() { return this.addWorkshopForm.get('description') };
  get capacity() { return this.addWorkshopForm.get('capacity') };
  get start_date() { return this.addWorkshopForm.get('start_date') };
  get end_date() { return this.addWorkshopForm.get('end_date') };
  get location() { return this.addWorkshopForm.get('location') };
  get link() { return this.addWorkshopForm.get('link') };

  //custom date range validity validator
  endDateValidator() {
    const start_date = new Date(this.addWorkshopForm.value.start_date);
    const end_date = new Date(this.addWorkshopForm.value.end_date);
    return this.dateValidity = end_date >= start_date
  };
  //format date
  formatDate(date: Date): Date {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate ? new Date(formattedDate) : new Date();
  }
    //add workshop 
    addWorkshop() {
      if (this.addWorkshopForm.valid) {
       const formData={
         ...this.addWorkshopForm.value,
         start_date: this.formatDate(this.addWorkshopForm.value.start_date),
         end_date: this.formatDate(this.addWorkshopForm.value.end_date)
       };
       this.sw.addWorkshop(formData).subscribe(
         res=>{
          //show popup message
          this.messageService.add({severity:'success', summary:'Success', detail:'Workshop updated successfully'});
          // wait 8s then route to show workshops
          setTimeout(() => {
            this.router.navigateByUrl("/workshopBack/show")
          }, 800);    
         },
         err=>{
          // show error popup
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to update workshop'});

                   
         }
       );
      }
      
     }


  


ngOnInit(): void {
  this.breadcrumbItems = [
    { label: 'dashboard', routerLink: '/dashboard' },
    { label: 'workshops', routerLink: '/workshopBack/show' },
    { label: 'add' }
  ];


  //add workshop form 
  this.addWorkshopForm = new FormGroup({
    title: new FormControl(this.workshop.title, Validators.required),
    description: new FormControl(this.workshop.description, Validators.required),
    capacity: new FormControl(this.workshop.capacity, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
    start_date: new FormControl(this.workshop.start_date, Validators.required),
    end_date: new FormControl(this.workshop.end_date, [Validators.required]),
    location: new FormControl(this.workshop.location),
    link: new FormControl(this.workshop.link),
    userId: new FormControl(this.workshop.userId),
  })

 


}



}
