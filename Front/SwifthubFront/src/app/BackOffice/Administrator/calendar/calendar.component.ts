import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponentAdmin {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  events: CalendarEvent[] =[];

  constructor(){
    const event1 = {
      title:"Cours de tennis",
      start: new Date("2024-03-28T12:00"),
    }
    const event2 = {
      title:"Cours de foot",
      start: new Date("2024-03-24T23:00"),
    }

    this.events.push(event1,event2);
  }

  


  setView(view : CalendarView){
    this.view = view;
  }

}