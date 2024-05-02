import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryform!:FormGroup;


  constructor( private fb: FormBuilder, private categoryService: CategoryService, private router:Router){}

  ngOnInit(): void {
    this.categoryform = this.fb.group({
      categoryName: ['', Validators.required]
    });
  }


  addCategory() {
    if (this.categoryform.valid) {
         console.log(this.categoryform.value);

    
      this.categoryService.addCategory(this.categoryform.value).subscribe(
        (response) => {
          // Afficher une alerte de succès avec SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Category added with success!',
            showConfirmButton: false,
            timer: 1500 // Fermer automatiquement l'alerte après 1.5 seconde
          }).then(() => {
            // Rediriger vers la liste des requests
            this.router.navigate(['/category/list-category']);
          });
        },
        (error) => {
          console.error('Error while adding category : ', error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/category/list-category']);
  }

}
