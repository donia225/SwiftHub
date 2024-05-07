import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingComponent } from './components/meeting/meeting.component';


const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: 'full' },
  {path:'meeting',component:MeetingComponent},
  { path: "home", loadChildren: () => import('../app/FrontOffice/home/home.module').then(m => m.HomeModule) },
  { path: "dashboard", loadChildren: () => import('../app/BackOffice/dashboard/dashboard.module').then(m => m.DashboardModule) },
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
