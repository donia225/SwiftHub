import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: "dashboard", pathMatch: 'full' },
  { path: "home", loadChildren: () => import('../app/FrontOffice/home/home.module').then(m => m.HomeModule) },
  { path: "dashboard", loadChildren: () => import('../app/BackOffice/dashboard/dashboard.module').then(m => m.DashboardModule) },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
