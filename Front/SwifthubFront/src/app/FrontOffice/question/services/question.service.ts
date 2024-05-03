import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { QuestionModel } from 'src/app/BackOffice/quizzes/Model/question-model';
import { AnswerModel } from 'src/app/BackOffice/quizzes/Model/answer-model';
import { Observable } from 'rxjs';
import { QuizModel } from 'src/app/BackOffice/quizzes/Model/quiz-model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  protected baseUrl = environment.API_URL;

  

  constructor(private http : HttpClient) { }



  getAllQuestions(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.baseUrl}/api/quizzes/questions/getAllQuestions`); 
  }

  getAllAnswers(): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(`${this.baseUrl}/api/quizzes/answers/getAllAnswers`); 
  }


  getAllQuizzes(): Observable<QuizModel[]> {
    return this.http.get<QuizModel[]>(`${this.baseUrl}/getAllQuizzes`); 
  }
}
