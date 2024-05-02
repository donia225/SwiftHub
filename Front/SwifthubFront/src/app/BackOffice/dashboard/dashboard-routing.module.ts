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
import { ListCategoryComponent } from '../categories/list-category/list-category.component';
import { AddCategoryComponent } from '../categories/add-category/add-category.component';

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

  {
    path: 'category', component: AppLayoutComponent,
    children: [
      { path: 'list-category', component: ListCategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
    

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
