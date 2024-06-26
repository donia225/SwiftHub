import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { ListQuizComponent } from '../quizzes/list-quiz/list-quiz.component';
import { AddQuizComponent } from '../quizzes/add-quiz/add-quiz.component';
import { ShowWorkshopComponent } from 'src/app/components/workshop/show-workshop/show-workshop.component';
import { EditWorkshopComponent } from 'src/app/components/workshop/edit-workshop/edit-workshop.component';
import { AddWorkshopComponent } from 'src/app/components/workshop/add-workshop/add-workshop.component';
import { DashboardComponent } from './dashboard.component';
import { AppComponentAdmin } from '../Administrator/AdminMainComponent/app.component';
import { AppComponentTeacher } from '../Teacher/TeacherMainComponent/app.component';
import { AppComponentStudent } from '../Student/StudentMainComponent/app.component';
import { PostAdminComponent } from '../post-admin/post-admin.component';
import { UpdateQuizComponent } from '../quizzes/update-quiz/update-quiz.component';
import { AddQuestionComponent } from '../quizzes/question/add-question/add-question.component';
import { ListQuestionComponent } from '../quizzes/list-question/list-question.component';
import { AdminShowFeedbackComponent } from 'src/app/components/feedback/admin-show-feedback/admin-show-feedback.component';
import { ListRequestComponent } from 'src/app/requests/list-request/list-request.component';
import { AddAnswerComponent } from 'src/app/requests/add-answer/add-answer.component';
import { UpdateQuestionComponent } from '../quizzes/update-question/update-question.component';
import { LoginComponent } from '../pages/login/login.component';







const routes: Routes = [

 {path:'dashboard',
  component:DashboardComponent,
  children:[
    {
      path: '', component: AppLayoutComponent,

    },
    { path: 'postAdmin', component: PostAdminComponent },
  ]
 },
  { path: 'login', component: LoginComponent },


  
  

  {
    path: 'quiz', component: AppLayoutComponent,
    children: [
      { path: 'list-quiz', component: ListQuizComponent },
      { path: 'add-quiz', component: AddQuizComponent },
      { path: 'update-quiz/:quizId', component: UpdateQuizComponent },
      {path:'add-question/:quizId', component: AddQuestionComponent},
    ]
  },
  {
    path: 'question', component: AppLayoutComponent,
    children: [
      { path: 'list-question', component: ListQuestionComponent },
  
    

    ]
  },
  

  {
    path: 'appointment', component: AppLayoutComponent,
    children: [
      { path: 'admin', component: AppComponentAdmin },
      { path: 'teacher', component: AppComponentTeacher },
      { path: 'student', component: AppComponentStudent },
      
    
      { path: 'update-question/update/:quizId/:question_id', component: UpdateQuestionComponent }



    ]
  },
  
  
  
  {
    path: 'workshopBack', component: AppLayoutComponent,
    children: [
      { path: 'edit/:id', component: EditWorkshopComponent },
      { path: 'show', component: ShowWorkshopComponent },
      { path: 'add', component: AddWorkshopComponent },
      { path: 'feedback', component: AdminShowFeedbackComponent },

    ]
  },
  {
    path: 'request', component: AppLayoutComponent,
    children: [
      { path: 'list-request', component: ListRequestComponent },
      {path:'add-answer/:idRequest', component: AddAnswerComponent}

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
