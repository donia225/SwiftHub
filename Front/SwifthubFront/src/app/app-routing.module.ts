import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingComponent } from './components/meeting/meeting.component';
import {LoginComponent} from "./BackOffice/pages/login/login.component";
import {RegisterComponent} from "./BackOffice/pages/register/register.component";

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: 'full' },
  { path: '', redirectTo: "dashboard", pathMatch: 'full' },
  { path: "home", loadChildren: () => import('../app/FrontOffice/home/home.module').then(m => m.HomeModule) },
  { path: "dashboard", loadChildren: () => import('../app/BackOffice/dashboard/dashboard.module').then(m => m.DashboardModule) },
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:'meeting',component:MeetingComponent},



];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
