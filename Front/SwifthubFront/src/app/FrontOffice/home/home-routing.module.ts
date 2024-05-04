import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home.component';
import { PostComponent } from '../post/post.component';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { ShowWorkshopComponent } from 'src/app/components/workshop/show-workshop/show-workshop.component';
import { UserWorkshopComponent } from 'src/app/components/workshop/user-workshop/user-workshop.component';
import { MeetingComponent } from 'src/app/components/meeting/meeting.component';
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
      { path: 'posts', component: PostComponent},
      { path: 'posts/:id', component: PostDetailsComponent },
      { path: 'workshop', component:ShowWorkshopComponent },
      {path:'my-workshops',component:UserWorkshopComponent},
      // {path:'meeting',component:MeetingComponent}
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
