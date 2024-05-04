
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { ListQuizComponent } from '../quizzes/list-quiz/list-quiz.component';
import { AddQuizComponent } from '../quizzes/add-quiz/add-quiz.component';
import { ShowWorkshopComponent } from 'src/app/components/workshop/show-workshop/show-workshop.component';
import { EditWorkshopComponent } from 'src/app/components/workshop/edit-workshop/edit-workshop.component';
import { AddWorkshopComponent } from 'src/app/components/workshop/add-workshop/add-workshop.component';
import { DashboardComponent } from './dashboard.component';
import { UpdateQuizComponent } from '../quizzes/update-quiz/update-quiz.component';

import { AddQuestionComponent } from '../quizzes/question/add-question/add-question.component';
import { ListQuestionComponent } from '../quizzes/list-question/list-question.component';



const routes: Routes = [

 {path:'dashboard',
  component:DashboardComponent,
  children:[
    {
      path: '', component: AppLayoutComponent,
     
    },
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
    path: 'workshopBack', component: AppLayoutComponent,
    children: [
      { path: 'edit/:id', component: EditWorkshopComponent },
      { path: 'show', component: ShowWorkshopComponent },
    
      { path: 'add', component: AddWorkshopComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
