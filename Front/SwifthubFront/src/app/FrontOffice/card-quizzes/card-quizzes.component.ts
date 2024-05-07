import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { QuizModel } from 'src/app/BackOffice/quizzes/Model/quiz-model';
import { QuizserviceService } from 'src/app/BackOffice/quizzes/service/quizservice.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';


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


  


  constructor( private quizService: QuizserviceService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllQuizzesForToday();
    //this.getQuizById();

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
    // Your start quiz logic here
    localStorage.setItem("name", this.name);
    this.hideDialog(); // Close the dialog
  }
  


}