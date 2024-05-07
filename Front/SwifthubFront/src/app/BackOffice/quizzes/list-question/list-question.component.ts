
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TreeNode} from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { QuizModel } from '../Model/quiz-model';
import { QuestionService } from '../service/question.service';
import { User } from 'src/app/models/user/user';



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
  quiz: QuizModel | undefined;



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
    this.extractQuizId();
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
  
  extractQuizId(): void {
    if (this.questions.length > 0 && this.questions[0].quiz) {
      console.log('Quiz:', this.questions[0].quiz);
      // Assuming each question contains a reference to the QuizModel object
      // You can extract quizId from the first question for example
      this.quiz = this.questions[0].quiz;
      console.log('Quiz ID:', this.quiz?.quizId);
    }
  }

  deleteQuestion(questionId: number): void {
    this.questionService.deleteQuestion(questionId).subscribe(
      () => {
        // Handle successful deletion here if needed
        console.log('Question deleted successfully');
        // Reload questions after deletion
        this.loadQuestions();
      },
      error => {
        // Handle error here if needed
        console.error('Error deleting question:', error);
      }
    );
  }

}