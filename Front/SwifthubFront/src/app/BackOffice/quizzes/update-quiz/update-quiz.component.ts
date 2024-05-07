import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizserviceService } from '../service/quizservice.service';
import { QuizModel } from '../Model/quiz-model';
@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  quizId!: number;
  updatedQuiz: QuizModel = { quizId: 0, quizName: '', quizTime: new Date(), questions: [] };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizserviceService,
  
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('quizId');
      if (id !== null) {
        this.quizId = +id;
        this.getQuizDetails(this.quizId);
      }
    });
  }

  getQuizDetails(quizId: number): void {
    this.quizService.getQuizById(quizId).subscribe(
      (quiz: QuizModel) => {
        this.updatedQuiz = quiz; // Populate the updatedQuiz object with fetched quiz details
        this.updatedQuiz.quizTime = new Date(quiz.quizTime);
      },
      (error) => {
        console.error('Error fetching quiz details:', error);
      }
    );
  }

  onSubmit(): void {
    this.quizService.updateQuiz(this.quizId, this.updatedQuiz).subscribe(
      (response) => {
        console.log('Quiz updated successfully!', response);
        this.router.navigate(['/quiz/list-quiz']);
      },
      (error) => {
        console.error('Error updating quiz:', error);
      }
    );
  }
}