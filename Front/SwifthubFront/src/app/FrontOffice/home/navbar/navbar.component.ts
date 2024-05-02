import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}
  isColorChanged: boolean = false;
  ngOnInit(): void {
   
    };
  

  toggleColor() {
    this.isColorChanged = !this.isColorChanged;
  }
  navigateToListComplaints() {
    this.router.navigate(['home/content/frontrequest']);
  }
  navigateToAddComplaint() {
    this.router.navigate(['home/content/frontadd']);
  }

}
