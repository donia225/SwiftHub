import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { RequestService } from '../request.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/users/user.service';

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
  users!: User[];
  LoggedInUser!:User;

  constructor(private requestService:RequestService, private route:Router, private userService:UserService ){

  }

  ngOnInit(): void {
    this.loadRequests();
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/home/content' },
      { label: 'List complaints' }
    ];

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
      if (this.LoggedInUser && result.isConfirmed) {
        var idUser:string=this.LoggedInUser.id
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
        console.log(this.selectedRequest);
        this.displayModal = true;
      },
      (error) => { console.error('Error loading request details:', error); }
    );
  }
  //fonction pour trier la table
  onSort() {
  
  }
  isStudentRoute() {
    return this.route.url === '/home/content/frontrequest'
  }
}
