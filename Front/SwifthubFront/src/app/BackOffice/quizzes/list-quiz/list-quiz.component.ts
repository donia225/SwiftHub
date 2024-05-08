import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { QuizserviceService } from '../service/quizservice.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/users/user.service';
@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss']

})
export class ListQuizComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  users!: User[];
 
  LoggedInUser!:User;
  quizzes: any[] = [];
  constructor(private http: HttpClient,private quizService: QuizserviceService,private router: Router, private userService:UserService) {

   }
  ngOnInit(): void {

    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/dashboard' },
      { label: 'List quizzes' , routerLink:'/quiz/list-quiz'}
    ];
    this.fetchQuizzes();


    var email= window.localStorage.getItem("email");
    console.log(email);
    
   if (email ) {
   
    this.userService.findUserByEmail(email).subscribe(
      res=>{
     this.LoggedInUser=res as User;   
     console.log(this.LoggedInUser);
     
      },
      err=>{
        console.log(err);
        
      }
    );
  }
  
      this.getUsers();
      this.fetchQuizzes();
  
  
  
  
  



  }
  getUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res as User[];
      },
      err => {
        console.log(err);
      }
    );
  }

  isStudentRoute() {
    return this.router.url === '/home/content'
  }
  
  isAdminRoute() {
    return this.router.url === '/quiz/list-quiz';

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
  deleteQUIZ(quizId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to remove this quiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(quizId).subscribe(
          () => {
            // Suppression réussie
          
            // Recharger la liste des demandes
            this.fetchQuizzes();
          },
          (error: HttpErrorResponse) => {
            console.error('Error while deleting quiz: ', error);
            alert('Error while deleting quiz: ' + error.message);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // L'utilisateur a cliqué sur "Non"
        Swal.fire('Cancelled', 'The quiz is not removed 🙂', 'info');
      }
    });
  }
 


 

  


  }
  





