import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../category.service';
import { Request } from '../Models/Request';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-front-add',
  templateUrl: './front-add.component.html',
  styleUrls: ['./front-add.component.scss']
})
export class FrontAddComponent implements OnInit {
  requestform!: FormGroup;
  users!: User[];
  Request: Request[] = [];
  categoryNames: string[] = ['Grade', 'Administration', 'Quality_of_study', 'Course'];
  LoggedInUser!:User;



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: RequestService,
    private categoryService: CategoryService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.requestform = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryName: [null, Validators.required],
      idUser:''
       
    });

    this.requestform.get('categoryName')?.valueChanges.subscribe(value => {
      console.log("Current category name:", value);
    });

     //fetch local storage
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

  //list users
  getUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res as User[];
      },
      err => {
        console.log(err);
      }
    );
  }


  

  addRequest(): void {
   
    if (this.LoggedInUser && this.requestform.valid) {
      //var idUser:string=this.LoggedInUser.id
      this.requestform.value.idUser = this.LoggedInUser.id;
      console.log(this.requestform.value);

      this.requestService.addRequest(this.requestform.value).subscribe(
        response => {
          // Afficher une alerte de succès avec SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Complaint added with success!',
            showConfirmButton: false,
            timer: 1500 // Fermer automatiquement l'alerte après 1.5 seconde
          }).then(() => {
            // Rediriger vers la liste des requests
            this.router.navigate(['/home/content/frontrequest']);
          });
        },
        error => {
          console.error('Error while adding request : ', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/home/content']);
  }
}
