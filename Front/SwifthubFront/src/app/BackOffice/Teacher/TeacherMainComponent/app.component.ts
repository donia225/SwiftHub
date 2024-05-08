import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentAddEditComponentTeacher } from '../appointment-add-edit/appointment-add-edit.component';
import { CalendarComponentTeacher } from '../calendar/calendar.component';
import { Router } from '@angular/router';
import { AppointementService } from '../services/appointement.service';
import { CoreService } from '../core/core.service';
import { UserService } from '../services/user-service.service';
import { AvailabilityServiceService } from '../services/availability-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponentTeacher implements OnInit {

  user: any;
  filteredAppointments: any[] = [];
  student: any;

  constructor(private _dialog: MatDialog, private _appoiService: AppointementService, private _coreService: CoreService, private userService: UserService, private _availabilityService: AvailabilityServiceService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.getAppointementList();
    
  }

  openAddEditAppointmentForm() {
    const dialogRef = this._dialog.open(AppointmentAddEditComponentTeacher)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAppointementList();
        }
      }
    })
  }

  openCalendarForm() {
    this._dialog.open(CalendarComponentTeacher)
  }

  getAppointementList() {
    this._appoiService.getEmployeeList().subscribe({
      next: (res :any[]) => {
        this.filteredAppointments = res.filter(appointment => {
          return appointment.professorId === this.userService.getUser().id && appointment.status === "CONFIRMED_BY_ADMIN";
        }).map(appointment => {
          return {
            ...appointment,
            professorName: '', // Initialisez professorName à une valeur par défaut
            studentName: '', // Initialisez studentName à une valeur par défaut
          };
        });
  
        // Maintenant, pour chaque rendez-vous, récupérez le nom du professeur et du student
        this.filteredAppointments.forEach(appointment => {
          this.userService.getUserById(appointment.professorId).subscribe((professorData) => {
            appointment.professorName = professorData.username;
          });
  
          this.userService.getUserById(appointment.studentId).subscribe((studentData) => {
            appointment.studentName = studentData.username;
          });
        });
  
        console.log(res);
        console.log(this.filteredAppointments);
      },
      error: console.log,
    });
  }
  


  refuseAppointment(appointment: any) {
    console.log(appointment)
    const updatedAppointment = { ...appointment };
    updatedAppointment.status = 'CANCELED_BY_TEACHER';
    this._appoiService.updateEmployee(updatedAppointment).subscribe({
      next: (res) => {
        this.getAppointementList();
        this._coreService.openSnackBar('Appointment refused!', 'done');
        this._availabilityService.updateReservedStatus(updatedAppointment.professorId,updatedAppointment.start,updatedAppointment.end)
        .subscribe({
          next: (result) => {
          },
          error: (error) => {
            console.error('Error updating reserved status:', error);
          }
        });;
      },
      error: console.log, 
    });
  }
  

  acceptAppointment(appointment: any) {
    console.log(appointment)
    const updatedAppointment = { ...appointment };
    updatedAppointment.status = 'CONFIRMED_BY_TEACHER';
    this._appoiService.updateEmployee(updatedAppointment).subscribe({
      next: (res) => {
        this.getAppointementList();
        console.log(appointment.studentId);
        this.userService.getUserById(appointment.studentId).subscribe((userData) => {
          this.student = userData;
          console.log(this.student); // Log des données de l'utilisateur une fois récupérées
          console.log("hhhhhhhahahahah");
          //this.userService.SendEmail("mohamed@gmail.com","yyyy","votreRendezousestconfirmer");

          this.userService.SendEmail(this.student.email, "start :  "+updatedAppointment.start + "          end :   " +updatedAppointment.end + "           location :  " + updatedAppointment.location , "votre rendez-vous est confirmer").subscribe({
            next: () => {
              this._coreService.openSnackBar('Email sent!', 'done');
            },
            error: (error) => {
              console.error('Error sending email:', error);
              // Gérer l'erreur
            }
          });



        });        
        this._coreService.openSnackBar('Appointment accepted!', 'done');
      },
      error: console.log, 
    });
  }
/*
  acceptAppointment(appointment: any) {
    
    this._appoiService.updateEmployee(updatedAppointment).subscribe({
      next: (res) => {
        this.getAppointementList();
        console.log(appointment.studentId);
        this.userService.getUserById(appointment.studentId).subscribe((userData) => {
          this.student = userData;
          console.log(this.student); // Log des données de l'utilisateur une fois récupérées
          console.log("hhhhhhhahahahah");
  
          // Utiliser les données de l'utilisateur pour envoyer l'e-mail
          this.userService.SendEmail(this.student.email, updatedAppointment.start + updatedAppointment.end, "votre rendez-vous est confirmer").subscribe({
            next: () => {
              this._coreService.openSnackBar('Appointment accepted!', 'done');
            },
            error: (error) => {
              console.error('Error sending email:', error);
              // Gérer l'erreur
            }
          });
        });
      },
      error: console.log, 
    });
  }
  */

  

}
