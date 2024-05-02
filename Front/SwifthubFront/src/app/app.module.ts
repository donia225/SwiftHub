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
import { DashboardComponent } from './BackOffice/dashboard/dashboard.component';
import { DashboardModule } from './BackOffice/dashboard/dashboard.module';
import { AppLayoutModule } from './BackOffice/layout/app.layout.module';
import { HomeModule } from './FrontOffice/home/home.module';

import { AddRequestComponent } from './requests/add-request/add-request.component';
import { ListRequestComponent } from './requests/list-request/list-request.component';
import { DropdownModule } from 'primeng/dropdown';
import { RequestService } from './requests/services/request.service';
import { UpdateRequestComponent } from './requests/update-request/update-request.component';
import { ListCategoryComponent } from './BackOffice/categories/list-category/list-category.component';
import { AddCategoryComponent } from './BackOffice/categories/add-category/add-category.component';
import { RequestComponent } from './FrontOffice/frontrequest/request/request.component';
import { FrontAddComponent } from './FrontOffice/frontrequest/front-add/front-add.component';
import { CardModule } from 'primeng/card';
import { UpdateReqComponent } from './FrontOffice/frontrequest/update-req/update-req.component';












@NgModule({
  declarations: [
    AppComponent,
   
    AddRequestComponent,
    ListRequestComponent,
    UpdateRequestComponent,
    ListCategoryComponent,
    AddCategoryComponent,
    RequestComponent,
    FrontAddComponent,
    UpdateReqComponent
   

    

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
    DropdownModule,
    CardModule
  ],
 
    bootstrap: [AppComponent]
})
export class AppModule { }
