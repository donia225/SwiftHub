import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isColorChanged: boolean = false;
  constructor(private router: Router) {}
  toggleColor() {
    this.isColorChanged = !this.isColorChanged;
  }


  navigateToListComplaints() {
    this.router.navigate(['home/content/frontrequest']);
  }
  navigateToAddComplaint() {
    this.router.navigate(['home/content/frontadd']);
  }
  navigateToListAnswers() {
    this.router.navigate(['home/content/list-answers']);
  }

}
