import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { QuizserviceService } from '../service/quizservice.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss']

})
export class ListQuizComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
 

  quizzes: any[] = [];
  constructor(private http: HttpClient,private quizService: QuizserviceService,private router: Router) {

   }
  ngOnInit(): void {

    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/dashboard' },
      { label: 'List quizzes' , routerLink:'/quiz/list-quiz'}
    ];
    this.fetchQuizzes();

  }
  fetchQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(
      (response) => {
        this.quizzes = response;
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
      }
    );
  }


  //fonction pour trier la table
  onSort() {
  
  }

 

  }
  





