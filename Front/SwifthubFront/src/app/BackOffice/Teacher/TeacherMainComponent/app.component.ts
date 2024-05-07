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

  constructor(private _dialog: MatDialog, private _appoiService: AppointementService, private _coreService: CoreService, private userService: UserService, private _availabilityService: AvailabilityServiceService) { }

  ngOnInit(): void {
    this.getAppointementList();
    this.user = this.userService.getUser();
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
        this.filteredAppointments = res.filter(appointment => appointment.professorId === this.userService.getUser().id && appointment.status === "CONFIRMED_BY_ADMIN"); //hedi bch titbaddl userService.getUser().username
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
        this._coreService.openSnackBar('Appointment accepted!', 'done');
      },
      error: console.log, 
    });
  }

  

}
