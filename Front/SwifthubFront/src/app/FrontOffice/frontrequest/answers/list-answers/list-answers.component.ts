import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AnswerService } from 'src/app/requests/services/answer.service';


@Component({
  selector: 'app-list-answers',
  templateUrl: './list-answers.component.html',
  styleUrls: ['./list-answers.component.scss']
})
export class ListAnswersComponent {
  //answers: any[]=[];
  breadcrumbItems: MenuItem[] = [];
  answers: any[] = [];

  constructor(private answerService:AnswerService, private route:Router ){

  }

 

  ngOnInit() {
    this.answerService.getAnswers().subscribe({
      next: (response: any[]) => {
        this.answers = response;
        console.log("Answers received", response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error while loading answers:', error.message);
        alert(error.message);
      }
    });
  }
  

 //loadRequests() {}
   


}
