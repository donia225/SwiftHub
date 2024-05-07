import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../category.service';
import { Request } from '../Models/Request';

@Component({
  selector: 'app-front-add',
  templateUrl: './front-add.component.html',
  styleUrls: ['./front-add.component.scss']
})
export class FrontAddComponent implements OnInit {
  requestform!: FormGroup;

  Request: Request[] = [];
  categoryNames: string[] = ['Grade', 'Administration', 'Quality_of_study', 'Course'];



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: RequestService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.requestform = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryName: [null, Validators.required], 
    });

    this.requestform.get('categoryName')?.valueChanges.subscribe(value => {
      console.log("Current category name:", value);
    });

    
  }


  

  addRequest(): void {
    if (this.requestform.valid) {
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
