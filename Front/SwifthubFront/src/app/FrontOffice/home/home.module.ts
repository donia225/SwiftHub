import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home.component';
import { WorkshopComponent } from '../workshop/workshop.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostComponent } from '../post/post.component';
import { PostDetailsComponent } from '../post-details/post-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    ContentComponent,
    FooterComponent,
    SidebarComponent,
    WorkshopComponent,
    //PostComponent,
    //PostDetailsComponent
   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    

   
    

  ]
})
export class HomeModule { }
