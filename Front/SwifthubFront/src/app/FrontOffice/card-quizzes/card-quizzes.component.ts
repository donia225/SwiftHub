import { Component, OnInit } from '@angular/core';
import { QuizModel } from 'src/app/BackOffice/quizzes/Model/quiz-model';
import { QuizserviceService } from 'src/app/BackOffice/quizzes/service/quizservice.service';

@Component({
  selector: 'app-card-quizzes',
  templateUrl: './card-quizzes.component.html',
  styleUrls: ['./card-quizzes.component.scss']
})
export class CardQuizzesComponent  implements OnInit {
  quizzes: QuizModel[] = [];

  constructor(private quizService: QuizserviceService) { } 

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  getAllQuizzes() {
    this.quizService.getAllQuizzes() 
      .subscribe((quizzes: QuizModel[]) => {
        this.quizzes = quizzes;
      });
  }
}