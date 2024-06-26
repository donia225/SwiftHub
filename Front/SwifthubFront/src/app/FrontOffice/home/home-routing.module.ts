import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home.component';
import { PostComponent } from '../post/post.component';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { ShowWorkshopComponent } from 'src/app/components/workshop/show-workshop/show-workshop.component';
import { UserWorkshopComponent } from 'src/app/components/workshop/user-workshop/user-workshop.component';
import { QuestionComponent } from '../question/question.component';
import { CardQuizzesComponent } from '../card-quizzes/card-quizzes.component';

import { RequestComponent } from '../frontrequest/request/request.component';
import { FrontAddComponent } from '../frontrequest/front-add/front-add.component';
import { UpdateReqComponent } from '../frontrequest/update-req/update-req.component';
import { ListAnswersComponent } from '../frontrequest/answers/list-answers/list-answers.component';

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
      {path: 'quiz-card', component:CardQuizzesComponent},
   
      { path: 'question/:quizId', component: QuestionComponent },
      {path: 'content/frontrequest', component:RequestComponent},
      {path: 'content/frontadd', component:FrontAddComponent},
      {path: 'content/update-req/:id', component:UpdateReqComponent},
      {path: 'content/list-answers', component:ListAnswersComponent}

      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
