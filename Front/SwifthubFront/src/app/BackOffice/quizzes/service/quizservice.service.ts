import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuizModel } from '../Model/quiz-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizserviceService {
  protected baseUrl = environment.API_URL; 
  private quizzes: QuizModel[] = [
   
  ];
  constructor(private http: HttpClient) { }

  getAllQuizzes(): Observable<QuizModel[]> {
    return this.http.get<QuizModel[]>(`${this.baseUrl}/api/quizzes/getAllQuizzes`); 
  }

  addQuiz(quiz: QuizModel): Observable<QuizModel> {
    return this.http.post<QuizModel>(`${this.baseUrl}/api/quizzes/add-quiz`, quiz);
  }

 
  getQuizById(quizId: number): Observable<QuizModel> {
    return this.http.get<QuizModel>(`${this.baseUrl}/api/quizzes/${quizId}`);
  }
  updateQuiz(quizId: number, updatedQuiz: QuizModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/quizzes/${quizId}`, updatedQuiz);
  }
  deleteQuiz(quizId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/quizzes/${quizId}`);
  }

 

}