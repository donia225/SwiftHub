import { QuestionService } from './../../../FrontOffice/question/services/question.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TreeNode} from 'primeng/api';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit{
  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  questions: any[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/dashboard' },
      { label: 'List questions', routerLink: '/question/list-question' }
    ];

    this.cols = [
      { field: 'question', header: 'Question' },
      { field: 'answerTxt', header: 'Answer' },
   
    ];

    this.getAllQuestions();
  }

  getAllQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      questions => {
        console.log('Questions received:', questions);
        this.questions = questions.map(question => ({
          question: question.questiontxt,
          answers: question.answers.map(answer => ({
            answerTxt: answer.answerTxt,
            correctAnswer: answer.correctAnswer 
              ? '<i class="pi pi-check" style="color: green"></i>' 
              : '<i class="pi pi-times" style="color: red"></i>'
          }))
        }));
        console.log('Processed questions:', this.questions);
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }
}