import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder,FormGroup,FormArray } from '@angular/forms';
import { QuestionModel } from '../../Model/question-model';
import { QuestionService } from '../../service/question.service';
import { Route,ActivatedRoute,Router } from '@angular/router';
import { AbstractControl,FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  
  addQuestionForm!: FormGroup;
  quizId: number = 0;
  answersArray!: FormArray; 

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addQuestionForm = this.formBuilder.group({
      questiontxt: ['', Validators.required],
      answers: this.formBuilder.array([]),
      available: [false]
    });
  
    // Initialize answersArray
    this.answersArray = this.addQuestionForm.get('answers') as FormArray;
  
    this.route.paramMap.subscribe(params => {
      const id = params.get('quizId');
      if (id !== null) {
        this.quizId = +id; 
      }
    });
  }

  onSubmit(): void {
    if (this.addQuestionForm.valid) {
      const question: QuestionModel = this.addQuestionForm.value;
      const quizIdString: string = this.quizId.toString(); // Convert number to string
      this.questionService.affectQuestionToQuiz(quizIdString, question).subscribe(
        (response) => {
          console.log('Question added successfully', response);
          // Redirect to the list of quizzes or another appropriate page
          this.router.navigate(['/quiz/list-quiz']);
        },
        (error) => {
          console.error('Error adding question', error);
        }
      );
    }
  }

  addAnswer() {
    const answerControl = this.formBuilder.group({
      answerTxt: [''],  // Ensure answerTxt control is initialized with a default value
      correctAnswer: [false],
      point: ['']  
    });
    (this.addQuestionForm.get('answers') as FormArray).push(answerControl);
  }
  
}