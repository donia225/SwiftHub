import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../services/answer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from '../Models/Answer';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss']
})
export class AddAnswerComponent implements OnInit{
  answerform!: FormGroup;
  idRequest: number = 0;
  

  constructor(
    private formBuilder: FormBuilder,
    private answerService: AnswerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.answerform = this.formBuilder.group({
      responseText: ['', Validators.required]
    
    });
  
    
   
  
    this.route.paramMap.subscribe(params => {
      const id = params.get('idRequest');
      if (id !== null) {
        this.idRequest = +id; 
      }
    });
  }

  onSubmit(): void {
    if (this.answerform.valid) {
      const answer: Answer = this.answerform.value;
      //const idRequesttoString: string = this.idRequest.toString(); // Convert number to string
      this.answerService.affectAnswerToRequest(this.idRequest, answer).subscribe(
        (response) => {
          console.log('Answer added successfully', response);
          
          this.router.navigate(['/request/list-request']);
        },
        (error) => {
          console.error('Error adding answer', error);
        }
      );
    }
  }

  
  
}


