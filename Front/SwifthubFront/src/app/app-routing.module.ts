import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingComponent } from './components/meeting/meeting.component';
import {LoginComponent} from "./BackOffice/pages/login/login.component";
import {RegisterComponent} from "./BackOffice/pages/register/register.component";
import {ConsultUsersComponent} from "./components/users/consult-users/consult-users.component";
import {authGuard} from "./auth/auth.guard";



const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: 'full' },
  // { path: '', redirectTo: "dashboard", pathMatch: 'full' },
  { path: "home", loadChildren: () => import('../app/FrontOffice/home/home.module').then(m => m.HomeModule) },
  { path: "dashboard", loadChildren: () => import('../app/BackOffice/dashboard/dashboard.module').then(m => m.DashboardModule) },
 
  
  { path: "dashboard", loadChildren: () => import('../app/BackOffice/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: [authGuard] },
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:'meeting',component:MeetingComponent},
  {path:'consultUser',component:ConsultUsersComponent},
  // { path: '**', redirectTo: 'login' },




];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
