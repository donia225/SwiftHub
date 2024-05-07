import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { RequestService } from '../request.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit{
  Request: any[]=[];
  breadcrumbItems: MenuItem[] = [];
  searchText: string = '';
  displayModal: boolean = false;
  selectedRequest: any = null;

  constructor(private requestService:RequestService, private route:Router ){

  }

  ngOnInit(): void {
    this.loadRequests();
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/home/content' },
      { label: 'List complaints' }
    ];
  }

  loadRequests() {
    if (this.searchText.trim()) {
      // If there is search text, perform a search
      this.requestService.searchRequests(this.searchText).subscribe(
        response => this.Request = response,
        error => this.handleError(error)
      );
    } else {
      // Otherwise, fetch all requests or a default set
      this.requestService.getAllRequests().subscribe(
        response => this.Request = response,
        error => this.handleError(error)
      );
    }
  }
  handleError(error: any): void {
    throw new Error('Method not implemented.');
  }

  onSearchChange(newSearchText: string) {
    this.searchText = newSearchText;
    this.loadRequests();
  }
  
  deleteRequest(idRequest: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to remove this complaint?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.requestService.deleterequest(idRequest).subscribe(
          () => {
            // Suppression réussie
            Swal.fire('Complaint removed!', 'The complaint has been removed.', 'success');
            // Recharger la liste des demandes
            this.loadRequests();
          },
          (error: HttpErrorResponse) => {
            console.error('Error while deleting request: ', error);
            alert('Error while deleting request: ' + error.message);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // L'utilisateur a cliqué sur "Non"
        Swal.fire('Cancelled', 'The complaint is not removed :)', 'info');
      }
    });
  }
  gotoupdatepage(idRequest: number) {
    this.route.navigate(['home/content/update-req', idRequest]);
  }

  openDetailsModal(idRequest: number): void {
    this.requestService.getRequestById(idRequest).subscribe(
      (response) => {
        this.selectedRequest = response;
        this.displayModal = true;
      },
      (error) => { console.error('Error loading request details:', error); }
    );
  }
  //fonction pour trier la table
  onSort() {
  
  }
}
