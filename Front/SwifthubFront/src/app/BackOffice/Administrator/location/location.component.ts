import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { AppointementService } from '../services/appointement.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { UserService } from '../services/user-service.service';
import { AvailabilityServiceService } from '../services/availability-service.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit{


  empForm : FormGroup

  constructor(
    private _fb: FormBuilder , 
    private _appointmentService: AppointementService, 
    private _dialogRef :MatDialogRef<LocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private _coreService: CoreService,
    private userService: UserService,
    private availabilityService: AvailabilityServiceService,
    private _locationService: LocationService, 
  ) {
    this.empForm = this._fb.group({
      id: null,
      bloc: [null, Validators.required],
      salle: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
        this._locationService.addLocation(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('location added successfully');
            this._dialogRef.close(true);
    
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    } else {
      this._coreService.openSnackBar('Please fill in all required fields');
    }
  }

}
