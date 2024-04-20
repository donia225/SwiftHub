import { Component, OnInit } from '@angular/core';
import { Workshop } from 'src/app/models/workshop/workshop';

@Component({
  selector: 'app-show-workshop',
  templateUrl: './show-workshop.component.html',
  styleUrls: ['./show-workshop.component.scss']
})
export class ShowWorkshopComponent implements OnInit {

  workshops!:Workshop[];
  


  constructor(){}

  ngOnInit(): void {
   
    
  }

}
