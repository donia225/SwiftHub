import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DashboardModule } from './BackOffice/dashboard/dashboard.module';
import { AppLayoutModule } from './BackOffice/layout/app.layout.module';
import { HomeModule } from './FrontOffice/home/home.module';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ConsultUsersComponent } from './components/users/consult-users/consult-users.component';
import { ModifyUsersComponent } from './components/users/modify-users/modify-users.component';








@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ConsultUsersComponent,
    ModifyUsersComponent,



  ],
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutingModule,
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
    CalendarModule,
    DynamicDialogModule,
    ConfirmPopupModule,
    ToolbarModule,
    ToastModule,
    HomeModule,






  ],

    bootstrap: [AppComponent]
})
export class AppModule { }
