import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../services/answer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from '../Models/Answer';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss']
})
export class AddAnswerComponent implements OnInit{
  answerform!: FormGroup;
  idRequest: number = 0;
  users!: User[];
  LoggedInUser!:User;

  constructor(
    private formBuilder: FormBuilder,
    private answerService: AnswerService,
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.answerform = this.formBuilder.group({
      responseText: ['', Validators.required],
      idUser:''
    
    });
  
    this.route.paramMap.subscribe(params => {
      const id = params.get('idRequest');
      if (id !== null) {
        this.idRequest = +id; 
      }
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

  onSubmit(): void {
    if (this.LoggedInUser && this.answerform.valid) {
      const answer: Answer = this.answerform.value;
      answer.idUser = this.LoggedInUser.id;
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

  isAdminRoute() {
    return this.router.url === '/request/add-answer/:idRequest';

  }

  
  
}


