import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.scss']
})
export class UpdateRequestComponent implements OnInit{
  requestform!:FormGroup;
  idRequest!:number;
  Request: any[]=[];

  constructor(private fb: FormBuilder, private requestService: RequestService, private router:Router, private activateRoute: ActivatedRoute){}


  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (param)=>{
       this.idRequest=param['idRequest']
      }
    )
    this.requestform = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
    });
  
  
    this.requestService.getRequestById(this.idRequest).subscribe(
      (Request:any)=>{
        this.requestform.controls['title'].setValue(Request.title)
        this.requestform.controls['description'].setValue(Request.description)
    
      }
    )

    
  
  }

  updateRequest() {
    if (this.requestform.valid) {
      // this.requestform.value pour obtenir les données du formulaire
      const Request = this.requestform.value;
  
      this.requestService.updaterequest(this.idRequest, Request).subscribe(
        (response) => {
          console.log(response);
          alert("Complaint modified");
        },
        (error) => {
          console.error('Error while updating request:', error);
        }
      );
    }
  }

 /*  onFileChange(event: any) {
    const file = event.target.files[0];
    this.requestform.patchValue({
     // attachment: file
    });

    this.requestService.getRequestById(this.idRequest).subscribe(
      (Request:any)=>{
        this.requestform.controls['title'].setValue(Request.title)
        this.requestform.controls['description'].setValue(Request.description)
       // this.requestform.controls['attachment'].setValue(Request.attachment)
        this.requestform.controls['visibility'].setValue(Request.visibility)
       // this.requestform.controls['category'].setValue(Request.category)
     
      }
    )
  } */

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.requestform.patchValue({
      attachment: file
    });
  }
  

  



}
