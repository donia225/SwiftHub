import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppointementService } from '../services/appointement.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { UserService } from '../services/user-service.service';
import { AvailabilityServiceService } from '../services/availability-service.service';

@Component({
  selector: 'app-appointment-add-edit',
  templateUrl: './appointment-add-edit.component.html',
  styleUrls: ['./appointment-add-edit.component.css']
})
export class AppointmentAddEditComponentTeacher implements OnInit{

  user: any;

  empForm : FormGroup
  
  respansable : string[] = [
    'Teacher',
    'Administrator',
  ];

  appointmentType : string[] = [
    'MEETING',
    'FACE_TO_FACE',
  ];

  ProfessorsList : any[] = [];
  AvailabilityList : any[] = [];

  constructor(
    private _fb: FormBuilder , 
    private _appointmentService: AppointementService, 
    private _dialogRef :MatDialogRef<AppointmentAddEditComponentTeacher>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private _coreService: CoreService,
    private userService: UserService,
    private availabilityService: AvailabilityServiceService
  ) {
    this.empForm = this._fb.group({
      id: null,
      description: null,
      start: null,
      end: null,
      status: 'AWAITING',
      reminder: false,
      appointmentType: null,
      studentId: null,
      professorId: null,
      location: null,
      priority: null,
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
    this.loadListOfProfessors();
    this.user = this.userService.getUser();

    this.empForm.patchValue({
      studentId: this.user.username
    });
  }


  onFormSubmit(){
    if(this.empForm.valid){
      // Utilisez l'opérateur de navigation sécurisée (?.) pour accéder aux propriétés de manière sécurisée
      const startTime = this.empForm.value.start?.startTime;
      const endTime = this.empForm.value.start?.endTime;
  
      // Assurez-vous que startTime et endTime ne sont pas undefined avant de les utiliser
      if (startTime !== undefined && endTime !== undefined) {
        // Assigner les valeurs de startTime et endTime aux champs start et end du formulaire
        this.empForm.patchValue({
          start: startTime,
          end: endTime,
        });
      }

      const professorId = this.empForm.value.professorId?.id;
      if (professorId !== undefined) {
        // Assigner l'ID du professeur au champ professorId du formulaire
        this.empForm.patchValue({
          professorId: professorId,
        });
      }
  
      if(this.data) {
        this._appointmentService.updateEmployee(this.empForm.value).subscribe({
          next: (val : any) => {
            this._coreService.openSnackBar('appointement detail updated!');
            this._dialogRef.close(true);
          },
          error: (err : any) => {
            console.error(err);
          },
        })
      }else{
        console.log(this.empForm.value)
        this._appointmentService.addEmployee(this.empForm.value).subscribe({
          next: (val : any) => {
            this._coreService.openSnackBar('appointement added successfully');
            this._dialogRef.close(true);
          },
          error: (err : any) => {
            console.error(err);
          },
        })
      }
    }
  }
  
  
  

  loadListOfProfessors(): void {
    this.userService.getUserByRole().subscribe(data => {
      console.log(data);
      this.ProfessorsList = data.map((user: any) => user);
    });
  }
/*
  loadListOfProfessorTimes(id:string): void {
    this.availabilityService.getAvailabilityrByUser(id).subscribe(data => {
      console.log(data);
      this.AvailabilityList = data.map((availability: any) => availability);
      console.log(this.AvailabilityList);
    });
  }

*/

  loadProfessorTimes(professorId: string): void {
    this.availabilityService.getAvailabilityrByUser(professorId).subscribe(data => {
      this.AvailabilityList = data.map((availability: any) => availability);
      console.log(this.AvailabilityList);
    });
  }

}
