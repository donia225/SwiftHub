import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable,of } from 'rxjs';
import { QuestionModel } from '../Model/question-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  protected baseUrl = environment.API_URL; 
  constructor(private http: HttpClient) { }


  affectQuestionToQuiz(quizId: string, question: QuestionModel): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(`${this.baseUrl}/api/quizzes/questions/${quizId}`, question);

   
  }
}
