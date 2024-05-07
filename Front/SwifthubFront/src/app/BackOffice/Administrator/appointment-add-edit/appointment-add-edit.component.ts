import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { AppointementService } from '../services/appointement.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { UserService } from '../services/user-service.service';
import { AvailabilityServiceService } from '../services/availability-service.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-appointment-add-edit',
  templateUrl: './appointment-add-edit.component.html',
  styleUrls: ['./appointment-add-edit.component.css']
})
export class AppointmentAddEditComponentAdmin implements OnInit{

  
  user: any;

  empForm : FormGroup
  
  LocationList : any[] = [];

  constructor(
    private _fb: FormBuilder , 
    private _appointmentService: AppointementService, 
    private _dialogRef :MatDialogRef<AppointmentAddEditComponentAdmin>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private _coreService: CoreService,
    private userService: UserService,
    private availabilityService: AvailabilityServiceService,
    private _locationService: LocationService, 
  ) {
    this.empForm = this._fb.group({
      id: null,
      description: null,
      start: null,
      end: null,
      status: '',
      reminder: false,
      studentId: null,
      professorId: null, 
      location: [null, Validators.required],
      appointmentType: null, 
      priority: null, 
      selectedTimeSlot: null,
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
    this.loadLocationList();
  }


  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.data.status="CONFIRMED_BY_ADMIN";
        this.data.location = this.empForm.value.location;
        console.log("hhhhhhh");
        console.log(this.data.location);
        console.log("hhhhhhh");
        this._appointmentService.updateEmployee(this.data).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('appointement detail updated!');
            this._dialogRef.close(true);
        
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._appointmentService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('appointement added successfully');
            this._dialogRef.close(true);
    
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    } else {
      this._coreService.openSnackBar('Please fill in all required fields');
    }
  }
  
  


 
  loadLocationList(): void {
    this._locationService.getLocationList().subscribe(data => {
      this.LocationList = data.map((location: any) => `${location.bloc}-${location.salle}`);
      console.log(this.LocationList)
    });
  }


  
  
}
