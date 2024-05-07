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
import { PostComponent } from './FrontOffice/post/post.component';
import { PostDetailsComponent } from './FrontOffice/post-details/post-details.component';
import { ShowWorkshopComponent } from './components/workshop/show-workshop/show-workshop.component';
import { EditWorkshopComponent } from './components/workshop/edit-workshop/edit-workshop.component';
import { HomeModule } from './FrontOffice/home/home.module';
import { ShowFeedbackComponent } from './components/feedback/show-feedback/show-feedback.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule, DatePipe } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeTableModule } from 'primeng/treetable';
import { AddQuestionComponent } from './BackOffice/quizzes/question/add-question/add-question.component';
import { QuizfrontComponent } from './FrontOffice/quizfront/quizfront.component';
import { QuestionComponent } from './FrontOffice/question/question.component';
import { UpdateQuizComponent } from './BackOffice/quizzes/update-quiz/update-quiz.component';
import { ListQuestionComponent } from './BackOffice/quizzes/list-question/list-question.component';
import { AddQuizComponent } from './BackOffice/quizzes/add-quiz/add-quiz.component';
import { CardQuizzesComponent } from './FrontOffice/card-quizzes/card-quizzes.component';
import { PaginatorModule } from 'primeng/paginator';
import { MeetingComponent } from './components/meeting/meeting.component';
import { AdminShowFeedbackComponent } from './components/feedback/admin-show-feedback/admin-show-feedback.component';
import { ListRequestComponent } from './requests/list-request/list-request.component';
import { RequestComponent } from './FrontOffice/frontrequest/request/request.component';
import { FrontAddComponent } from './FrontOffice/frontrequest/front-add/front-add.component';
import { UpdateReqComponent } from './FrontOffice/frontrequest/update-req/update-req.component';
import { AddAnswerComponent } from './requests/add-answer/add-answer.component';
import { PostAdminComponent } from './BackOffice/post-admin/post-admin.component';
import { EditorModule } from 'primeng/editor';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ListAnswersComponent } from './FrontOffice/frontrequest/answers/list-answers/list-answers.component';
import {RegisterComponent} from "./BackOffice/pages/register/register.component";
import {AddWorkshopComponent} from "./components/workshop/add-workshop/add-workshop.component";
import {UserWorkshopComponent} from "./components/workshop/user-workshop/user-workshop.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConsultUsersComponent} from "./components/users/consult-users/consult-users.component";

@NgModule({
  declarations: [
    AppComponent,
     PostComponent,
     PostDetailsComponent,
    PostAdminComponent,
    ShowWorkshopComponent,
    ShowFeedbackComponent,
    MeetingComponent,
    EditWorkshopComponent,
    AddWorkshopComponent,
    QuizfrontComponent,
    QuestionComponent,
    UpdateQuizComponent,
    ListQuestionComponent,
    AddQuestionComponent,
    CardQuizzesComponent,
    MeetingComponent,
    UserWorkshopComponent,
    MeetingComponent,
    AdminShowFeedbackComponent,
    ListRequestComponent,
    RequestComponent,
    FrontAddComponent,
    UpdateReqComponent,
    AddAnswerComponent,
    ListAnswersComponent,
    ShowWorkshopComponent,
    ConsultUsersComponent,





  ],
  imports: [
    TriStateCheckboxModule,
    EditorModule,
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
    SelectButtonModule,
    RegisterComponent,
    ConfirmDialogModule,
    CardModule,
    SelectButtonModule,
    HomeModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
		RatingModule,
		SliderModule,
		MultiSelectModule,
		ProgressBarModule,
    TreeTableModule,
    BreadcrumbModule,
    PanelModule,
    
	
	
    PaginatorModule




  ],
    providers:[MessageService,ConfirmationService,DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
