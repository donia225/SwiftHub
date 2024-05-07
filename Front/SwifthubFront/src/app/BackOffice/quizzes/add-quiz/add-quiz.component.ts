import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuizserviceService } from '../service/quizservice.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/users/user.service';
@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent   implements OnInit   {
  breadcrumbItems: MenuItem[] = [];
  quizForm: FormGroup;
  users!: User[];
  loggedInUser!: User;
 
 


  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient,private quizService: QuizserviceService, private userService:UserService) {
    this.quizForm = this.fb.group({
      quizName: ['', Validators.required],
      quizTime: [null, Validators.required],
      userId: ""
    });
  }
  ngOnInit(): void {
    var email = window.localStorage.getItem("email");
    console.log(email);
  
    if (email) {
      this.userService.findUserByEmail(email).subscribe(
        res => {
          this.loggedInUser = res as User;
          console.log(this.loggedInUser);
        },
        err => {
          console.log(err);
        },
        () => {
          // Logic to execute after user data retrieval is complete
          this.addQuiz();
        }
      );
}


  }

  isStudentRoute() {
    return this.router.url === '/home/content'
  }
  
  isAdminRoute() {
    return this.router.url === '/quiz/add-quiz';

  }

   addQuiz() {
    if (this.loggedInUser && this.quizForm.valid) {
      const newQuiz = this.quizForm.value;
      newQuiz.userId = this.loggedInUser.id;
  
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