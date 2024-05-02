import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home.component';
import { WorkshopComponent } from '../workshop/workshop.component';
import { QuestionComponent } from '../question/question.component';
import { CardQuizzesComponent } from '../card-quizzes/card-quizzes.component';
import { QuizfrontComponent } from '../quizfront/quizfront.component';

const routes: Routes = [
  
  { 
    path: 'home', 
    component: HomeComponent,
    
    children: [
      // {path:'home',redirectTo:'content'} ,    
      { path: 'content', component:ContentComponent },
      { path: 'workshop', component:WorkshopComponent },
      {path: 'quiz-card', component:CardQuizzesComponent},
      {path: 'quizfront', component:QuizfrontComponent},
      { path: 'question/:quizId', component: QuestionComponent },

      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
