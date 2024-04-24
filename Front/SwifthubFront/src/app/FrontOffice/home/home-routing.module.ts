import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home.component';
import { WorkshopComponent } from '../workshop/workshop.component';
import { PostComponent } from '../post/post.component';
import { PostDetailsComponent } from '../post-details/post-details.component';
const routes: Routes = [
  
  { 
    path: 'home', 
    component: HomeComponent,
    
    children: [
      // {path:'home',redirectTo:'content'} ,    
      { path: 'content', component:ContentComponent },
      { path: 'workshop', component:WorkshopComponent },
      { path: 'posts', component: PostComponent},
      { path: 'posts/:id', component: PostDetailsComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
