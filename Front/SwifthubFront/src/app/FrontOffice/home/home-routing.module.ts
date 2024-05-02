import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home.component';
import { WorkshopComponent } from '../workshop/workshop.component';
import { RequestComponent } from '../frontrequest/request/request.component';

import { FrontAddComponent } from '../frontrequest/front-add/front-add.component';
import { UpdateReqComponent } from '../frontrequest/update-req/update-req.component';



const routes: Routes = [
  
  { 
    path: 'home', 
    component: HomeComponent,
    
    children: [
      // {path:'home',redirectTo:'content'} ,    
      { path: 'content', component:ContentComponent },
      { path: 'workshop', component:WorkshopComponent },
      {path: 'content/frontrequest', component:RequestComponent},
      {path: 'content/frontadd', component:FrontAddComponent},
      {path: 'content/update-req/:id', component:UpdateReqComponent}
      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
