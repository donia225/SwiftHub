import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Workshop } from 'src/app/models/workshop/workshop';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';

@Component({
  selector: 'app-show-workshop',
  templateUrl: './show-workshop.component.html',
  styleUrls: ['./show-workshop.component.scss']
})
export class ShowWorkshopComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  workshops!:Workshop[];

  
  
  getWorkshops(){
    this.serviceWorkshop.getAllWorkshops().subscribe(
      res=>{
        console.log(res);
        this.workshops=res;
        
      },
      err=>{
        console.log(err);
        
      }
    );
  }


  constructor(public serviceWorkshop:WorkshopService){}

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/dashboard' },
      { label: 'workshops' }
    ];

   this.getWorkshops();
    
  }

}
