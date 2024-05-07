import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  protected baseUrl = environment.API_URL; 

  constructor(private http: HttpClient) { }

  
  generateCertificatePdf(): Observable<string> {
    return this.http.post(`${this.baseUrl}/api/quizzes/certificate/generateCertificatePdf`, {}, { responseType: 'text' });
  }
}
