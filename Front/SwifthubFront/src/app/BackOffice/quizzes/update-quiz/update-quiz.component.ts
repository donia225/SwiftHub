import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizserviceService } from '../service/quizservice.service';
import { QuizModel } from '../Model/quiz-model';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/user/user';
@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  quizId!: number;
  updateForm!: FormGroup;
  updatedQuiz: QuizModel = {
    quizId: 0, quizName: '', quizTime: new Date(), questions: [],
   
  };
  LoggedInUser: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizserviceService,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('quizId');
      if (id !== null) {
        this.quizId = +id;
        this.getQuizDetails(this.quizId);

       

      }
      
    });


    this.updateForm = this.fb.group({
      quizName: ['', [Validators.required, Validators.minLength(5)]], 
      quizTime: [null, [Validators.required, this.dateNotInPastValidator()]],
      userId: ''
    });
    var email= window.localStorage.getItem("email");
  console.log(email);
  
 if (email ) {
 
  this.userService.findUserByEmail(email).subscribe(
    res=>{
   this.LoggedInUser=res as User;   
   console.log(this.LoggedInUser);
   
    },
    err=>{
      console.log(err);
      
    }
  );
}
    
  }

  getQuizDetails(quizId: number): void {
    this.quizService.getQuizById(quizId).subscribe(
      (quiz: QuizModel) => {
        this.updatedQuiz = quiz; // Populate the updatedQuiz object with fetched quiz details
        this.updatedQuiz.quizTime = new Date(quiz.quizTime);
      },
      (error) => {
        console.error('Error fetching quiz details:', error);
      }
    );
  }

  onSubmit(): void {
    this.quizService.updateQuiz(this.quizId, this.updatedQuiz).subscribe(
      (response) => {
        console.log('Quiz updated successfully!', response);
        this.router.navigate(['/quiz/list-quiz']);
      },
      (error) => {
        console.error('Error updating quiz:', error);
      }
    );
  }

  dateNotInPastValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = new Date();
      const selectedDate = control.value;
      if (selectedDate < currentDate) {
        return { 'dateNotInPast': true };
      }
      return null;
    };
  }


}