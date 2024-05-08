import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-update-req',
  templateUrl: './update-req.component.html',
  styleUrls: ['./update-req.component.scss']
})
export class UpdateReqComponent implements OnInit{
  requestform!: FormGroup;
  idRequest!:number;
  categoryNames: string[] = ['Grade', 'Administration', 'Quality_of_study', 'Course'];
  users!: User[];
  LoggedInUser!:User;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activateRoute:ActivatedRoute,
    private requestService: RequestService,
    private userService: UserService

  ) {}


  ngOnInit(): void {


    this.requestform = this.fb.group(
   {
    title: ['', Validators.required],
    description: ['', Validators.required],
    categoryName: [null, Validators.required], 
    idUser:''
}
)

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


this.activateRoute.params.subscribe(
  (param)=>{
   
     this.idRequest=param['id']

})
this.requestService.getRequestById(this.idRequest).subscribe(
      (Request)=>{
          
        this.requestform.controls['title'].setValue(Request.title)
        this.requestform.controls['description'].setValue(Request.description)
        this.requestform.controls['categoryName'].setValue(Request.categoryName)
      }

   )


}


updateRequest() {

  
  if (this.LoggedInUser && this.requestform.valid) {
    // this.requestform.value pour obtenir les données du formulaire
    const Request = this.requestform.value;
    Request.idUser= this.LoggedInUser.id;
    this.requestService.updaterequest(this.idRequest, Request).subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Success', 'Complaint modified', 'success').then(() => {
          this.router.navigate(['home/content/frontrequest']);
        });
      },
      (error) => {
        console.error('Error while updating request:', error);
        Swal.fire('Error', 'Failed to update complaint', 'error');
      }
    );
  }
  





}

  cancel(): void {
    this.router.navigate(['home/content/frontrequest']);
  }
}
