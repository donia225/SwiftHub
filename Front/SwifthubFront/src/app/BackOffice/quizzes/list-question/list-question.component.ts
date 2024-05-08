
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TreeNode} from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { QuizModel } from '../Model/quiz-model';
import { QuestionService } from '../service/question.service';
import { User } from 'src/app/models/user/user';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';



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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to remove this question?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(questionId).subscribe(
          () => {
            // Handle successful deletion here if needed
            console.log('Question deleted successfully');
            // Reload questions after deletion
            this.loadQuestions();
          },
          (error: HttpErrorResponse) => {
            console.error('Error while deleting question: ', error);
            alert('Error while deleting question: ' + error.message);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // L'utilisateur a cliqué sur "Non"
        Swal.fire('Cancelled', 'The question is not removed 🙂', 'info');
      }
    });
  }

}