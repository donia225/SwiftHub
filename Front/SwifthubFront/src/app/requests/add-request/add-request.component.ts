import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../services/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  requestform!:FormGroup;


  constructor( private fb: FormBuilder, private requestService: RequestService, private router:Router){}

  ngOnInit(): void {
    this.requestform = this.fb.group({
      title: ['', Validators.required], // Champ titre requis
     // category: ['', Validators.required], // Champ catégorie requis
      description: ['', Validators.required], // Champ description requis
      visibility: [false], // Initialisation à false
      //attachment: ['']
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    // Traitez le fichier ici, par exemple, affectez-le à une propriété de votre formulaire
    this.requestform.patchValue({
      attachment: file
    });
  }

  addRequest() {
    if (this.requestform.valid) {
         console.log(this.requestform.value);

    
      this.requestService.addRequest(this.requestform.value).subscribe(
        (response) => {
          // Afficher une alerte de succès avec SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Complaint added with success!',
            showConfirmButton: false,
            timer: 1500 // Fermer automatiquement l'alerte après 1.5 seconde
          }).then(() => {
            // Rediriger vers la liste des requests
            this.router.navigate(['/request/list-request']);
          });
        },
        (error) => {
          console.error('Error while adding request : ', error);
        }
      );
    }
  }

  
}
