import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QuestionModel } from '../Model/question-model';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit {
  editForm: FormGroup;
  quizId: number | undefined;
  question: QuestionModel = {
    questiontxt: '', answers: [],
    question_id: 0,
    answered: false,
    quiz: { quizId: 0, quizName: '', quizTime: new Date(), questions: [] },
   
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {
    this.editForm = this.formBuilder.group({
      questiontxt: [''],
      answers: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    const quizIdParam = this.route.snapshot.paramMap.get('quizId');
    const questionIdParam = this.route.snapshot.paramMap.get('question_id');
    
    
    if (quizIdParam && questionIdParam) {
      this.quizId = +quizIdParam;
      const question_id = +questionIdParam;
      this.loadQuestionDetails(question_id);
    } else {
      console.error('Route parameters are null or undefined');
      // Handle the case when route parameters are not available
    }
  }

  loadQuestionDetails(question_id: number): void {
    this.questionService.getQuestionById(question_id).subscribe((question: QuestionModel) => {
      this.question = question;
      this.editForm.patchValue({
        questiontxt: question.questiontxt
      });

      const answersFormArray = this.editForm.get('answers') as FormArray;
      question.answers.forEach(answer => {
        answersFormArray.push(this.formBuilder.group({
          answerTxt: answer.answerTxt,
          correctAnswer: answer.correctAnswer,
          point: answer.point
        }));
      });
    });
  }

  onSubmit(): void {
    // Prepare updated question object
    const updatedQuestion: QuestionModel = {
      question_id: this.question.question_id,
      questiontxt: this.editForm.value.questiontxt,
      answered: false, // Add the 'answered' property with a default value
      quiz: {
        quizId: 0,
        quizName: '',
        quizTime: new Date(),
        questions: []
      }, // Add the 'quiz' property with an empty object as a placeholder
     
      answers: this.editForm.value.answers
    };

    // Call service method to update question
    if (this.quizId && this.question) {
      this.questionService.updateQuestionsAndAnswers(this.quizId, [updatedQuestion]).subscribe(() => {
        console.log('Questions and answers updated successfully for quiz with ID ' + this.quizId);
        // Optionally, redirect to question list or show success message
      }, error => {
        console.error('Error updating questions and answers:', error);
        // Handle error appropriately
      });
    } else {
      console.error('Quiz ID or question is null or undefined');
      // Handle the case when quiz ID or question is not available
    }
  }

  addAnswer(): void {
    const answersFormArray = this.editForm.get('answers') as FormArray;
    answersFormArray.push(this.formBuilder.group({
      answerTxt: '',
      correctAnswer: false,
      point: 0
    }));
  }
}