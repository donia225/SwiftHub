import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { QuizModel } from 'src/app/BackOffice/quizzes/Model/quiz-model';
import { QuizserviceService } from 'src/app/BackOffice/quizzes/service/quizservice.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/user/user';


@Component({
  selector: 'app-card-quizzes',
  templateUrl: './card-quizzes.component.html',
  styleUrls: ['./card-quizzes.component.scss']
})
export class CardQuizzesComponent  implements OnInit {
  quizzes: QuizModel[] = [];
  displayDialog: boolean = false;
  name: string = '';
  quiz!: QuizModel;
  quizId!: number;
  searchQuery: string = '';
  filteredQuizzes: QuizModel[] = [];
  loggedInUser!: User;


  


  constructor( private quizService: QuizserviceService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  // getUserInfo(): void {
  //   // Assurez-vous de passer le nom d'utilisateur actuellement connecté à la méthode findUserByUsername
  //   const username = this.loggedInUser.username;
  //   this.userService.findUserByUsername(username).subscribe(
  //     (user: any) => {
  //       this.loggedInUser = user as User;
  //     },
  //     (error) => {
  //       console.error("Une erreur s'est produite lors de la récupération des informations de l'utilisateur :", error);
  //       // Gérer l'erreur, par exemple en affichant un message à l'utilisateur ou en effectuant une action appropriée
  //     }
  //   );
  // }
  


  ngOnInit(): void {
    this.getAllQuizzesForToday();
    //this.getQuizById();
    // this.getUserInfo();

  

  }

    /*   getQuizById(): void {
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    this.quizService.getQuizById(this.quizId).subscribe((data) => {
      this.quiz = data;
      console.log(data);
    });
  } */
   
  
  
  getAllQuizzesForToday() {
    const now = new Date();
    const todayString = this.formatDateTime(now);
    this.quizService.getAllQuizzes().subscribe((quizzes: QuizModel[]) => {
      this.quizzes = quizzes.filter(quiz => this.formatDateTime(new Date(quiz.quizTime)) === todayString);
      this.filteredQuizzes = [...this.quizzes]; // Initialize filteredQuizzes array
    });
  }

  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  searchQuizzes(): void {
    if (!this.searchQuery.trim()) {
      this.filteredQuizzes = [...this.quizzes]; // Reset the filtered quizzes if search query is empty
    } else {
      this.filteredQuizzes = this.quizzes.filter(quiz =>
        quiz.quizName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

 
  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }


  logQuizId(quizId: number) {
    console.log('Quiz ID:', quizId);
  }
  

  /* startQuiz(quiz: QuizModel): void {
    if (quiz && quiz.quizId) {
      localStorage.setItem('name', this.name);
      this.hideDialog(); // Close the dialog
      this.router.navigate(['/home/question', quiz.quizId]); // Navigate to the question page with quiz ID
    } else {
      console.error('Quiz ID is undefined');
    }
  } */
  
 startQuiz() {
  if (!this.loggedInUser) {
    console.log('Utilisateur non connecté');
    return;
  }

  // Vérifier si l'utilisateur a déjà passé le quiz
  const quizId = this.quiz.quizId;
  const key = 'doneQuizzes';
  let doneQuizzes: number[] = JSON.parse(localStorage.getItem(key) || '[]');

  if (doneQuizzes.includes(quizId)) {
    console.log('Vous avez déjà passé ce quiz.');
    return;
  }

  // Si l'utilisateur n'a pas encore passé le quiz, enregistrer l'ID du quiz dans localStorage
  doneQuizzes.push(quizId);
  localStorage.setItem(key, JSON.stringify(doneQuizzes));

  // Autres actions nécessaires pour démarrer le quiz
  const username = this.loggedInUser.username;
  localStorage.setItem('username', username);
  this.hideDialog();
}



  hasUserDoneQuiz(quizId: number): boolean {
    const key = `quiz_${quizId}_done`;
    return localStorage.getItem(key) === 'true';
}

  


}