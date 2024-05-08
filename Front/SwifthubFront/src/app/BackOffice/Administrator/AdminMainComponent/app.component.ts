import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentAddEditComponentAdmin } from '../appointment-add-edit/appointment-add-edit.component';
import { CalendarComponentAdmin } from '../calendar/calendar.component';
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
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AvailabilityServiceService } from '../services/availability-service.service';
import { LocationComponent } from '../location/location.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponentAdmin implements OnInit{

  user: any;
  //filteredAppointments!:  MatTableDataSource<any>;
  
  displayedColumns: string[] = ['description', 'start', 'end' ,'status','appointmentType','student','professorId','location','action'];
 
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

  @ViewChild('paginator1') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog , private _appoiService: AppointementService , private _coreService: CoreService , private userService: UserService, private _availabilityService : AvailabilityServiceService) {}

  ngOnInit(): void {
    this.GetAppointementList();
    //this.getAppointementListWithAwaitingStatus();
    this.user = this.userService.getUser();
  }

  OpenAddEditAppointmentForm(){
    const dialogRef = this._dialog.open(AppointmentAddEditComponentAdmin)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.GetAppointementList()
        }
      }
    })
  }
  OpenLocationForm(){
    const dialogRef = this._dialog.open(LocationComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.GetAppointementList()
        }
      }
    })
  }

  OpenCalendarForm(){
    this._dialog.open(CalendarComponentAdmin)
  }

  GetAppointementList(){
    this.displayedColumns = ['description', 'start', 'end', 'status', 'appointmentType', 'student', 'professorId', 'location'];
    this._appoiService.getEmployeeList().subscribe({
      next: (res:any[]) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       // console.log(res[7].location.name)
       console.log(this.dataSource);
      },
      error: console.log,
    });
  }

 




  getAppointementListWithAwaitingStatus() {
    this.displayedColumns = ['description', 'start', 'end', 'status', 'appointmentType', 'student', 'professorId', 'location', 'action'];
    this._appoiService.getEmployeeList().subscribe({
      next: (res: any[]) => {
        const filteredAppointments = res.filter(appointment => appointment.status === "AWAITING").map(appointment => {
          return {
            ...appointment,
            professorName: '', // Initialisez professorName à une valeur par défaut
            studentName: '', // Initialisez studentName à une valeur par défaut
          };
        });
  
        // Maintenant, pour chaque rendez-vous, récupérez le nom du professeur et du student
        filteredAppointments.forEach(appointment => {
          this.userService.getUserById(appointment.professorId).subscribe((professorData) => {
            appointment.professorName = professorData.username;
          });
  
          this.userService.getUserById(appointment.studentId).subscribe((studentData) => {
            appointment.studentName = studentData.username;
          });
        });
  
        this.dataSource2 = new MatTableDataSource(filteredAppointments);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator2;
      },
      error: console.error,
    });
  }
  


  
  onTabChange(index: number) {
    if (index === 1) {
      this.getAppointementListWithAwaitingStatus();
    } else {
      this.GetAppointementList();
    }
}
  
  


  applyFilter(event: Event, dataSource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  



  deleteEmployee(appointment: any) {
    const updatedAppointment = { ...appointment };
    this._appoiService.deleteEmployee(updatedAppointment.id).subscribe({
      next: (res) => {
        this.getAppointementListWithAwaitingStatus();
        this._coreService.openSnackBar('Appointment deleted!', 'done');
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


  refuseAppointment(appointment: any) {
    //console.log(appointment)
    const updatedAppointment = { ...appointment };
    updatedAppointment.status = 'CANCELED_BY_ADMIN';
    this._appoiService.updateEmployee(updatedAppointment).subscribe({
      next: (res) => {
        this.getAppointementListWithAwaitingStatus();
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






  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AppointmentAddEditComponentAdmin, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAppointementList();
        }
      },
    });
  }
  

 
}











