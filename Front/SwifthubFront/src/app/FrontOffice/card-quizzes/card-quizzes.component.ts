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


  


  constructor( private quizService: QuizserviceService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllQuizzes();
    //this.getQuizById();

  }

    /*   getQuizById(): void {
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    this.quizService.getQuizById(this.quizId).subscribe((data) => {
      this.quiz = data;
      console.log(data);
    });
  } */
   
  
  

  getAllQuizzes() {
    this.quizService.getAllQuizzes() 
      .subscribe((quizzes: QuizModel[]) => {
        this.quizzes = quizzes;
      });
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