import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit{

  Category: any[]=[];
  breadcrumbItems: MenuItem[] = [];

  constructor(private categoryService:CategoryService, private route:Router ){

  }

  ngOnInit(): void {
    this.loadCategories();
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/home/content' },
      { label: 'List categories' }
    ];
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (response: any[]) => {
        this.Category = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error while loading requests: ', error);
        alert(error.message);
      }
    );
  }
  
  deleteCategory(idCategory: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to remove this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(idCategory).subscribe(
          () => {
            // Suppression réussie
            Swal.fire('Category removed!', 'The category has been removed.', 'success');
            // Recharger la liste des demandes
            this.loadCategories();
          },
          (error: HttpErrorResponse) => {
            console.error('Error while deleting category: ', error);
            alert('Error while deleting category: ' + error.message);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // L'utilisateur a cliqué sur "Non"
        Swal.fire('Cancelled', 'The category is not removed :)', 'info');
      }
    });
  }

  //fonction pour trier la table
  onSort() {
  
  }

  

}


