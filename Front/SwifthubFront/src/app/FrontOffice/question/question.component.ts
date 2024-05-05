import { Component, OnInit, HostListener } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from './services/question.service';
import { QuestionModel } from 'src/app/BackOffice/quizzes/Model/question-model';
import { AnswerModel } from 'src/app/BackOffice/quizzes/Model/answer-model';
import { QuizModel } from 'src/app/BackOffice/quizzes/Model/quiz-model';
import { ActivatedRoute } from '@angular/router';
import { QuizserviceService } from 'src/app/BackOffice/quizzes/service/quizservice.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name: string = "";
  public questionList!:  QuestionModel[];
  public currentQuestion: number = 0;
  public points: number = 0;
  public counter = 60;
  public correctAnswer: number = 0;
  public inCorrectAnswer: number = 0;
  public interval$: any;
  public progress: string = "0";
  public isQuizCompleted : boolean = false;
  public quiz: QuizModel | undefined;
  public selectedAnswers: AnswerModel[] = []; 


  constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute, private quizService: QuizserviceService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;

    this.getQuizDetails();
    this.startCounter();


  }

 

  @HostListener('document:keydown.escape', ['$event'])
  onEscKeyDown(event: KeyboardEvent) {
      event.preventDefault(); // Empêche le comportement par défaut de la touche "Échap"
  }
  

  getQuizDetails() {
    const quizId = this.activatedRoute.snapshot.paramMap.get('quizId');
    if (quizId !== null) {
      this.quizService.getQuizById(+quizId).subscribe((quiz: QuizModel) => {
        this.quiz = quiz;
        this.questionList = quiz.questions;
      });
    }
  }
  selectAnswer(selectedAnswer: AnswerModel) {
    const currentQuestion: QuestionModel = this.questionList[this.currentQuestion];
    if (!currentQuestion.answered) {
      currentQuestion.answered = true;
      if (!this.selectedAnswers[this.currentQuestion]) {
        this.selectedAnswers[this.currentQuestion] = selectedAnswer;
        if (selectedAnswer.correctAnswer) {
          this.points += 5;
          this.correctAnswer++;
        } else {
          this.points -= 5;
          this.inCorrectAnswer++;
        }
      }
      setTimeout(() => {
        this.currentQuestion++;
        this.getProgressPercent();
        if (this.currentQuestion === this.questionList.length) {
            this.isQuizCompleted = true;
            this.stopCounter();
        }
    }, 1000);
  }
}




nextQuestion() {
  if (this.currentQuestion < this.questionList.length - 1) { // Check if there are more questions
    this.currentQuestion++;
  }
}


  previousQuestion() {
    this.currentQuestion--;
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(val => {
      if (this.counter > 0) {
        this.counter--;
      } else {
        this.stopCounter();
        this.isQuizCompleted = true;
      }
    });
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
    
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
  }
}