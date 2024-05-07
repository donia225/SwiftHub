import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable,catchError,of } from 'rxjs';
import { QuestionModel } from '../Model/question-model';
import { AnswerModel } from '../Model/answer-model';
import { QuizModel } from '../Model/quiz-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  protected baseUrl = environment.API_URL; 
  constructor(private http: HttpClient) { }


  affectQuestionToQuiz(quizId: string, question: QuestionModel): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(`${this.baseUrl}/api/quizzes/questions/${quizId}`, question);

   
  }

  updateQuestionsAndAnswers(quizId: number, updatedQuestions: QuestionModel[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/quizzes/questions/${quizId}/update`, updatedQuestions);
  }

  getQuestionById(question_id: number): Observable<QuestionModel> {
    return this.http.get<QuestionModel>(`${this.baseUrl}/api/quizzes/questions/${question_id}`);
  }

  deleteQuestion(question_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/quizzes/questions/${question_id}`)
      .pipe(
        catchError(error => {
          // Handle error here if needed
          console.error('Error deleting question:', error);
          throw error; // Rethrow the error to be handled by the caller
        })
      );
  }

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
