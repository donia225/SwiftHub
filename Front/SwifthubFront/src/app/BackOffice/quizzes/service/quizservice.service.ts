import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuizModel } from '../Model/quiz-model';

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

 
  getQuizById(quiz_id: number): Observable<QuizModel> {
    return this.http.get<QuizModel>(`${this.baseUrl}/api/quizzes/${quiz_id}`);
  }
  updateQuiz(quiz_id: number, updatedQuiz: QuizModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/quizzes/update-quiz/${quiz_id}`, updatedQuiz);
  }
  deleteQuiz(quiz_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/quizzes/${quiz_id}`);
  }


}