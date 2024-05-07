import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { UserService } from '../services/user-service.service';
import { AppointementService } from '../services/appointement.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponentTeacher implements OnInit{
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  user: any;
  events: CalendarEvent[] =[];

  constructor(
    private appointmentService: AppointementService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.loadAppointments();
  }


  loadAppointments() {
    this.appointmentService.getEmployeeList().subscribe({
      next: (appointments: any[]) => {
        const userAppointments = appointments.filter(appointment => appointment.professorId === this.user.id && appointment.status ==="CONFIRMED_BY_TEACHER");
        console.log(userAppointments),
        // Convertir les rendez-vous en format d'événement de calendrier
        this.events = userAppointments.map(appointment => ({
          title: appointment.location ? appointment.location : 'Location non spécifiée',
          start: new Date(appointment.start),
          end: new Date(appointment.end) 
        }));
      },
      error: console.error
    });
  }
  


  setView(view : CalendarView){
    this.view = view;
  }

}










  

  

  

 