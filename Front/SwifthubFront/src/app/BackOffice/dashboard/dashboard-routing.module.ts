import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { ListQuizComponent } from '../quizzes/list-quiz/list-quiz.component';
import { AddQuizComponent } from '../quizzes/add-quiz/add-quiz.component';
import { DashboardComponent } from './dashboard.component';
import {LoginComponent} from "../pages/login/login.component";
import {RegisterComponent} from "../pages/register/register.component";

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

    ]
  },
  {
    path: 'workshopBack', component: AppLayoutComponent,
    children: [
   /*   { path: 'edit/:id', component: EditWorkshopComponent },
      { path: 'show', component: ShowWorkshopComponent },

      { path: 'add', component: AddWorkshopComponent },*/

    ]
  },
  {path:"register",component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
