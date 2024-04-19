import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss']
})
export class ListQuizComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];

  ngOnInit(): void {

    
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/' },
      { label: 'List quizzes' }
    ];
   

  }

  //fonction pour trier la table
  onSort() {
  
  }
  

}
