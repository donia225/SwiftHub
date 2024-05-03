import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home.component';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,

    children: [
      // {path:'home',redirectTo:'content'} ,
      { path: 'content', component:ContentComponent },
      // {path:'meeting',component:MeetingComponent}

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
