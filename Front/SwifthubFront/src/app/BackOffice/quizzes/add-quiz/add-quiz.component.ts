import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuizserviceService } from '../service/quizservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent {
  breadcrumbItems: MenuItem[] = [];
  quizForm: FormGroup;
 

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient,private quizService: QuizserviceService) {
    this.quizForm = this.fb.group({
      quizName: ['', Validators.required],
      quizTime: [null, Validators.required] // Vous pouvez ajouter d'autres validations selon vos besoins
    });
  }

  addQuiz() {
    if (this.quizForm.valid) {
      const newQuiz = this.quizForm.value;

    
      this.quizService.addQuiz(newQuiz).subscribe(
        (response) => {
          // Afficher une alerte de succès avec SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Quiz ajouté avec succès!',
            showConfirmButton: false,
            timer: 1500 // Fermer automatiquement l'alerte après 1.5 seconde
          }).then(() => {
            // Rediriger vers la liste des quizzes
            this.router.navigate(['/quiz/list-quiz']);
          });
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du quiz : ', error);
        }
      );
    }
  }
}