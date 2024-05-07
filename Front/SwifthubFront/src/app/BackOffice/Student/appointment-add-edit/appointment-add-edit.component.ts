import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class AppointmentAddEditComponentStudent implements OnInit{

  user: any;

  empForm : FormGroup
  

  appointmentType : string[] = [
    
    'Tutorat_academique','Consultation_de_projet','Orientation_academique','Discussion_de_carriere','Revision_dexamens','Presentation_de_projet','Soutien_a_lapprentissage_en_ligne','Mentorat_academique','autres'

  ];





  ProfessorsList : any[] = [];
  AvailabilityList : any[] = [];

  constructor(
    private _fb: FormBuilder , 
    private _appointmentService: AppointementService, 
    private _dialogRef :MatDialogRef<AppointmentAddEditComponentStudent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private _coreService: CoreService,
    private userService: UserService,
    private availabilityService: AvailabilityServiceService
  ) {
    this.empForm = this._fb.group({
      id: null,
      description: [null, Validators.required],
      start: null,
      end: null,
      status: 'AWAITING',
      reminder: false,
      studentId: null,
      professorId: [null, Validators.required],
      location: null,
      appointmentType: [null, Validators.required],
      priority: [null, Validators.required],
      selectedTimeSlot: null,
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
    this.loadListOfProfessors();
    this.user = this.userService.getUser();

    this.empForm.patchValue({
      studentId: this.user.id
    });
  }


  onFormSubmit() {
    if (this.empForm.valid) {
      // Vérifiez si une option de temps est sélectionnée
      if (!this.empForm.value.selectedTimeSlot) {
        this._coreService.openSnackBar('Please select available time');
        return; // Empêche l'envoi du formulaire si l'heure n'est pas sélectionnée
      }
      // Utilisez l'opérateur de navigation sécurisée (?.) pour accéder aux propriétés de manière sécurisée
      const startTime = this.empForm.value.selectedTimeSlot?.startTime;
      const endTime = this.empForm.value.selectedTimeSlot?.endTime;
      console.log(startTime);
      console.log("hahahahahaha");
      console.log(endTime);
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
  
      if (this.data) {
        this._appointmentService.updateEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('appointement detail updated!');
            this._dialogRef.close(true);
            this.callUpdateReservedStatus();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        console.log(this.empForm.value);
        this._appointmentService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('appointement added successfully');
            this._dialogRef.close(true);
            // this.availabilityService.
            this.callUpdateReservedStatus();
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
  
  


  callUpdateReservedStatus(): void {
    // Vérifiez si un créneau horaire est sélectionné
    const selectedTimeSlot = this.empForm.value.selectedTimeSlot; // Récupérer l'objet de temps complet sélectionné
    if (selectedTimeSlot) {
      // Obtenez l'ID de l'Availability
      const availabilityId = this.AvailabilityList[0].id; // Supposons que vous preniez le premier élément de la liste
      // Obtenez l'ID du TimeSlot à partir de l'objet de temps sélectionné
      const timeSlotId = selectedTimeSlot.id;
      console.log(availabilityId)
      console.log(timeSlotId)
      // Appelez updateReservedStatus
      this.availabilityService.updateReservedStatus(availabilityId, timeSlotId).subscribe({
        next: (val: any) => {
          console.log(val); // Vous pouvez gérer la réponse si nécessaire
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
}





  
  

  loadListOfProfessors(): void {
    this.userService.getUserByRole().subscribe(data => {
      console.log(data);
      this.ProfessorsList = data.map((user: any) => user);
    });
  }
/*

  loadProfessorTimes(professorId: string): void {
    this.availabilityService.getAvailabilityrByUser(professorId).subscribe(data => {
      this.AvailabilityList = data.map((availability: any) => availability);
      console.log(this.AvailabilityList);
    });
  }
  */
 
  loadProfessorTimes(professorId: string): void {
    this.availabilityService.getAvailabilityrByUser(professorId).subscribe(data => {
      // Filtrer les timeslots avec reserved === false
      console.log(data);
      this.AvailabilityList = data.map((availability: any) => ({
        ...availability,
        availableTimeSlots: availability.availableTimeSlots.filter((slot: any) => !slot.reserved)
      }));
      console.log(this.AvailabilityList[0]);
    });
  }
  
  
  

}
