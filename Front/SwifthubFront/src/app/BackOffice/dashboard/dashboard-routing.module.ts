import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { ListQuizComponent } from '../quizzes/list-quiz/list-quiz.component';
import { AddQuizComponent } from '../quizzes/add-quiz/add-quiz.component';
import { DashboardComponent } from './dashboard.component';
import { ListRequestComponent } from 'src/app/requests/list-request/list-request.component';
import { AddRequestComponent } from 'src/app/requests/add-request/add-request.component';
import { UpdateRequestComponent } from 'src/app/requests/update-request/update-request.component';

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
    path: 'request', component: AppLayoutComponent,
    children: [
      { path: 'list-request', component: ListRequestComponent },
      { path: 'add-request', component: AddRequestComponent },
      {path:"update-request/:idRequest",component:UpdateRequestComponent},

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
