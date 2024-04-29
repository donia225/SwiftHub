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
  quizId: string = '';
  answersArray!: FormArray; 
  answerTxt: string = '';
  correctAnswer: boolean = false;

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
      available:[false]
    });
    
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('quiz_id');
      if (id !== null) {
        this.quizId = id;
      }
    });
  }

  onSubmit(): void {
    if (this.addQuestionForm.valid) {
      const question: QuestionModel = this.addQuestionForm.value;
      this.questionService.affectQuestionToQuiz(this.quizId, question).subscribe(
        (response) => {
          console.log('Question ajoutée avec succès', response);
        
          // Rediriger vers la liste des quiz ou une autre page appropriée
          this.router.navigate(['/quiz/list-quiz']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la question', error);
        }
      );
    }
  }

  addAnswer() {
    const answerControl = this.formBuilder.group({
      answerTxt: [''],
      correctAnswer: [false]
    });
    (this.addQuestionForm.get('answers') as FormArray).push(answerControl);
  }
  
 
}
