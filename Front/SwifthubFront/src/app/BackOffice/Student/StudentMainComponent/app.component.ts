import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentAddEditComponentStudent } from '../appointment-add-edit/appointment-add-edit.component';
import { CalendarComponentStudent } from '../calendar/calendar.component';
import { Router } from '@angular/router';
import { AppointementService } from '../services/appointement.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from '../core/core.service';
import { UserService } from '../services/user-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponentStudent implements OnInit{

  user: any;
  //username$: Observable<string>;
  teacher: any;
  
  displayedColumns: string[] = ['description', 'start', 'end' ,'status', 'appointmentType' ,'priority','student','professorId','location'];
 
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog , private _appoiService: AppointementService , private _coreService: CoreService , private serviceUser: UserService, ) {
  }

  ngOnInit(): void {
    this.user = this.serviceUser.getUser();
    this.GetAppointementList();
  }


  getUsernameById(id: string): Observable<string> {
    return this.serviceUser.getUserById(id);
    
  }
  



  OpenAddEditAppointmentForm(){
    const dialogRef = this._dialog.open(AppointmentAddEditComponentStudent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.GetAppointementList()
        }
      }
    })
  }

  OpenCalendarForm(){
    this._dialog.open(CalendarComponentStudent)
  }

  GetAppointementList(){
    this._appoiService.getEmployeeList().subscribe({
      next: (res :any[]) =>{
      const filteredAppointments = res.filter(appointment => appointment.studentId === this.serviceUser.getUser().id);

      filteredAppointments.forEach(appointment => {
        this.serviceUser.getUserById(appointment.professorId).subscribe((userData) => {
          appointment.name = userData.username; 
        });
      });

      this.dataSource = new MatTableDataSource(filteredAppointments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

 
   

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
}
