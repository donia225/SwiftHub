import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 // Assurez-vous que le modèle Answer est correctement défini
import { environment } from 'src/environments/environment';
import { Answer } from '../Models/Answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private url = `${environment.apiBaseUrl}/answers`;

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.url);
  }

  getAnswerById(id: number): Observable<Answer> {
    return this.http.get<Answer>(`${this.url}/${id}`);
  }

  createAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.url}/add-answer`, answer);
  }

  affectAnswerToRequest(idRequest: number, answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.url}/addcateg`, { ...answer, request: { idRequest } });
  }
}
