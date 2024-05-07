
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder,FormGroup,FormArray } from '@angular/forms';
import { QuestionModel } from '../../Model/question-model';
import { QuestionService } from '../../service/question.service';
import { Route,ActivatedRoute,Router } from '@angular/router';
import { AbstractControl,FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  
  addQuestionForm!: FormGroup;
  quizId: number = 0;
  answersArray!: FormArray; 
  users!: User[];
  loggedInUser!: User;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.addQuestionForm = this.formBuilder.group({
      questiontxt: ['', Validators.required],
      answers: this.formBuilder.array([]),
      available: [false],
      userId: ['']
    });
  
    // Initialize answersArray
    this.answersArray = this.addQuestionForm.get('answers') as FormArray;
  
    this.route.paramMap.subscribe(params => {
      const id = params.get('quizId');
      if (id !== null) {
        this.quizId = +id; 
      }
    });
    const email = window.localStorage.getItem("email");
    if (email) {
      this.userService.findUserByEmail(email).subscribe(
        res => {
          this.loggedInUser = res as User;
          this.addQuestionForm.patchValue({ userId: this.loggedInUser.id });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.addQuestionForm.valid ) {
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
    const userId = this.loggedInUser.id;
  
    const answerControl = this.formBuilder.group({
      answerTxt: [''],  
      correctAnswer: [false],
      point: [''],
      userId: [userId] // Initialize userId directly
    });
  
    (this.addQuestionForm.get('answers') as FormArray).push(answerControl);
  }
  
}