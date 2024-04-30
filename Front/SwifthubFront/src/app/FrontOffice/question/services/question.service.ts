import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { QuestionModel } from 'src/app/BackOffice/quizzes/Model/question-model';
import { AnswerModel } from 'src/app/BackOffice/quizzes/Model/answer-model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  protected baseUrl = "http://localhost:8090/api/quizzes"

  

  constructor(private http : HttpClient) { }



  getAllQuestions(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.baseUrl}/questions/getAllQuestions`); 
  }

  getAllAnswers(): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(`${this.baseUrl}/answers/getAllAnswers`); 
  }
}
