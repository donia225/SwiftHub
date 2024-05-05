import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-req',
  templateUrl: './update-req.component.html',
  styleUrls: ['./update-req.component.scss']
})
export class UpdateReqComponent implements OnInit{
  requestform!: FormGroup;
  idRequest!:number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activateRoute:ActivatedRoute,
    private requestService: RequestService

  ) {}


  ngOnInit(): void {


    this.requestform = this.fb.group(
   {
    title: ['', Validators.required],
    description: ['', Validators.required]
}
)


this.activateRoute.params.subscribe(
  (param)=>{
   
     this.idRequest=param['id']

})
this.requestService.getRequestById(this.idRequest).subscribe(
      (Request)=>{
          
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
