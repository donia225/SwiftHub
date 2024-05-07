import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  protected baseUrl = environment.API_URL; 

  constructor(private http: HttpClient) { }

  
 /*  generateCertificatePdf(): Observable<string> {
    return this.http.post(`${this.baseUrl}/api/quizzes/certificate/generateCertificatePdf`, {}, { responseType: 'text' });
  } */
  downloadCertificate() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
    this.http.get(`${this.baseUrl}/api/quizzes/certificate/download`, { headers, responseType: 'blob' })
      .subscribe(response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }
  
}
