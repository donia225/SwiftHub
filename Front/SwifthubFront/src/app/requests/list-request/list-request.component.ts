import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RequestService } from '../services/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AnswerService } from '../services/answer.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit {
  Request: any[]=[];
  breadcrumbItems: MenuItem[] = [];
  displayModal: boolean = false;
  selectedRequest: any = null;

  constructor(private requestService:RequestService,private answerService: AnswerService, private route:Router ){

  }

  ngOnInit(): void {
    this.loadRequests();
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/home/content' },
      { label: 'List requests' }
    ];
  }

  loadRequests() {
    this.requestService.getAllRequests().subscribe(
      (response: any[]) => {
        this.Request = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error while loading requests: ', error);
        alert(error.message);
      }
    );
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

