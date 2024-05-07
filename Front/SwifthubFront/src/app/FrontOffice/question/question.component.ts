import { ResultModel } from './../../BackOffice/quizzes/Model/result-model';
import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/BackOffice/quizzes/service/question.service';
import { QuestionModel } from 'src/app/BackOffice/quizzes/Model/question-model';
import { AnswerModel } from 'src/app/BackOffice/quizzes/Model/answer-model';
import { QuizModel } from 'src/app/BackOffice/quizzes/Model/quiz-model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizserviceService } from 'src/app/BackOffice/quizzes/service/quizservice.service';
import { HttpClient } from '@angular/common/http';
import { CertificateService } from 'src/app/BackOffice/quizzes/service/certificate.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/users/user.service';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements AfterViewInit {
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
  isSessionActive: boolean = false;
  users!: User[];
  LoggedInUser!:User;

  private readonly FULL_SCREEN_ELEMENT_ID = 'fullscreen-card';
  private readonly ESCAPE_KEY_CODE = 27;

  constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute, private quizService: QuizserviceService, private http: HttpClient, private certificateService: CertificateService, private userService :UserService, private router :Router) { }
  protected baseUrl = environment.API_URL;
  

  ngOnInit(): void {
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
    this.getQuizDetails();
    this.startCounter();
   
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
      score: this.totalScore,
      studentId: this.LoggedInUser.id
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

  ngAfterViewInit() {
    this.requestFullScreen();
  }


  // Demander le mode plein écran pour l'élément spécifié
  private requestFullScreen() {
    const element = document.getElementById(this.FULL_SCREEN_ELEMENT_ID);
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.requestFullscreen) { // Pour Safari
        element.requestFullscreen();
      } else if (element.requestFullscreen) { // Pour IE/Edge
        element.requestFullscreen();
      }
    }
  }

  // Intercepter la touche "Échap" pour empêcher de quitter le mode plein écran
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.keyCode === this.ESCAPE_KEY_CODE) {
      event.preventDefault();
      this.requestFullScreen(); // Réactiver le mode plein écran
    }
  }
 

}