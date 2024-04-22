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

  deleteQuiz(quiz_id: string): void {
    this.quizService.deleteQuiz(quiz_id).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Quiz supprimé avec succès!',
          showConfirmButton: false,
          timer: 1500 // Fermer automatiquement l'alerte après 1.5 seconde
        }).then(() => {
          // Rediriger vers la liste des quizzes
          this.router.navigate(['/quiz/list-quiz']);
        });
      },
      (error) => {
        console.error('Erreur lors de suppression du quiz : ', error);
      }
    );
  }

  }
  





