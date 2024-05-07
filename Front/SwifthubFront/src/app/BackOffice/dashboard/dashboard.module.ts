import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListQuizComponent } from '../quizzes/list-quiz/list-quiz.component';
import { AddQuizComponent } from '../quizzes/add-quiz/add-quiz.component';
import { AppLayoutModule } from '../layout/app.layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import {LoginComponent} from "../pages/login/login.component";
import { ListRequestComponent } from 'src/app/requests/list-request/list-request.component';
import { PostAdminComponent } from '../post-admin/post-admin.component';

import { CalendarModule  as AngularCalendarModule, DateAdapter } from 'angular-calendar';

import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AppComponentAdmin} from '../Administrator/AdminMainComponent/app.component';
import {AppComponentTeacher} from '../Teacher/TeacherMainComponent/app.component';
import {AppComponentStudent} from '../Student/StudentMainComponent/app.component';
import {AppointmentAddEditComponentAdmin} from '../Administrator/appointment-add-edit/appointment-add-edit.component'
import {AppointmentAddEditComponentTeacher} from '../Teacher/appointment-add-edit/appointment-add-edit.component'
import {AppointmentAddEditComponentStudent} from '../Student/appointment-add-edit/appointment-add-edit.component'
import {CalendarComponentAdmin} from '../Administrator/calendar/calendar.component';
import {CalendarComponentTeacher} from '../Teacher/calendar/calendar.component';
import {CalendarComponentStudent} from '../Student/calendar/calendar.component';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {LocationComponent} from '../Administrator/location/location.component'





@NgModule({
  declarations: [
    DashboardComponent,
    ListQuizComponent,
    AddQuizComponent,
    CalendarComponentAdmin,CalendarComponentTeacher,CalendarComponentStudent,
    AppointmentAddEditComponentAdmin,AppointmentAddEditComponentTeacher,AppointmentAddEditComponentStudent,
    AppComponentAdmin,AppComponentTeacher,AppComponentStudent,LocationComponent,

    LoginComponent
    
  
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppLayoutModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    MessagesModule,
    ReactiveFormsModule,
    TableModule,
    CalendarModule,
    BreadcrumbModule,
    DropdownModule,
    InputNumberModule,
    FieldsetModule,
    FileUploadModule,
    CheckboxModule,
    PanelModule,
    ConfirmPopupModule,
    ToggleButtonModule,
    AutoCompleteModule,
    DialogModule,
    AngularCalendarModule,
    DynamicDialogModule,
    ConfirmPopupModule,
    ToolbarModule,
    ToastModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AngularCalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),


    
  ],
  providers: [DialogService,DynamicDialogRef],
})
export class DashboardModule { }
