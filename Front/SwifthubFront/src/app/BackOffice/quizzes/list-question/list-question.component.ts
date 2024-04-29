import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit{
  breadcrumbItems: MenuItem[] = [];
  
  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/dashboard' },
      { label: 'List questions' , routerLink:'/question/list-question'}
    ];
    
  }
  onSort() {
  
  }


}
