import { QuestionService } from './../../../FrontOffice/question/services/question.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TreeNode} from 'primeng/api';
import { Paginator } from 'primeng/paginator';


@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit{
  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  questions: any[] = [];
  allQuestions: any[] = [];
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 5;


  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/dashboard' },
      { label: 'List questions', routerLink: '/question/list-question' }
    ];

    this.cols = [
      { field: 'question', header: 'Question' },
      { field: 'answerTxt', header: 'Answer' },
      { field: 'quizName', header: 'Quiz Name' }, // Assuming there is a quizName property in each question object
      { field: 'actions', header: 'Actions' } // You might want to adjust this based on actual actions
    ];

    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      response => {
        console.log('Questions received:', response);
        this.totalRecords = response.length;
        this.allQuestions = response;
        this.loadQuestionsPerPage();
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  loadQuestionsPerPage(): void {
    // Calculate the index of the first and last records to display
    const startIndex = this.first;
    const endIndex = Math.min(this.first + this.rows, this.totalRecords);
    // Slice the questions array based on the calculated indices
    this.questions = this.allQuestions.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.loadQuestionsPerPage();
  }
  
}