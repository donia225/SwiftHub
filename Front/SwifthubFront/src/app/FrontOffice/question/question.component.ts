import { ResultModel } from './../../BackOffice/quizzes/Model/result-model';
import { Component, OnInit, HostListener } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from './services/question.service';
import { QuestionModel } from 'src/app/BackOffice/quizzes/Model/question-model';
import { AnswerModel } from 'src/app/BackOffice/quizzes/Model/answer-model';
import { QuizModel } from 'src/app/BackOffice/quizzes/Model/quiz-model';
import { ActivatedRoute } from '@angular/router';
import { QuizserviceService } from 'src/app/BackOffice/quizzes/service/quizservice.service';
import { HttpClient } from '@angular/common/http';
import { CertificateService } from 'src/app/BackOffice/quizzes/service/certificate.service';
import { environment } from 'src/environments/environment';



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
  public counter = 120;
  public correctAnswer: number = 0;
  public inCorrectAnswer: number = 0;
  public interval$: any;
  public progress: string = "0";
  public isQuizCompleted : boolean = false;
  public quiz: QuizModel | undefined;
  public selectedAnswers: AnswerModel[] = []; 
 public  maxPossiblePoints: number = 0;
 public totalScore: number = 0;
  ResultModel: any;

 

  constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute, private quizService: QuizserviceService, private http: HttpClient, private certificateService: CertificateService) { }
  protected baseUrl = environment.API_URL;
  

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
        this.points += selectedAnswer.point; // Add the points of the selected answer
        if (selectedAnswer.correctAnswer) {
          this.correctAnswer++;
        } else {
          this.inCorrectAnswer++;
        }
      }
      setTimeout(() => {
        this.currentQuestion++;
        this.getProgressPercent();
        if (this.currentQuestion === this.questionList.length) {
          this.isQuizCompleted = true;
          this.stopCounter();
          this.totalScore = this.calculateTotalScore();
          this.saveResult();
        }
      }, 1000);
    }
  }
  calculateTotalScore(): number {
    return this.selectedAnswers.reduce((total, answer) => total + answer.point, 0);
  }

  saveResult(): void {
    this.totalScore = this.calculateTotalScore();
    let quizId = 0; // Définir une valeur par défaut pour quizId
    if (this.quiz && this.quiz.quizId !== undefined) {
      quizId = this.quiz.quizId;
    }
  
    const resultDTO: ResultModel = {
      quizId: quizId,
      score: this.totalScore
    };
  
    this.http.post(`${this.baseUrl}/api/quizzes/result/results`, resultDTO).subscribe(
      () => {
        console.log('Result saved successfully');
      },
      (error) => {
        console.error('An error occurred while saving the result', error);
      }
    );
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

  isPreviousDisabled(): boolean {
    if (this.currentQuestion === 0) {
      return true; // Si c'est la première question, désactiver la flèche précédente
    } else {
      const previousQuestion: QuestionModel = this.questionList[this.currentQuestion - 1];
      return previousQuestion.answered; // Désactiver la flèche précédente si la question précédente a déjà été répondue
    }
  }

  onDownloadCertificateClick(): void {
    this.certificateService.downloadCertificate();
  }


}