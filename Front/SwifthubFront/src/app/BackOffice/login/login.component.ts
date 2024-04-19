import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../layout/service/login.service';
import { Login } from '../Model/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  public loginData: Login = new Login('', ''); // Initialize an instance of Login
  public messages: any[] = [];
  formSubmit: boolean = false;
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      mdp: ['', Validators.required],
    });
  }
  

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
  
  
    const loginControl = this.loginForm.get('login');
    const passwordControl = this.loginForm.get('mdp');
  
    if (!loginControl || !passwordControl) {
      console.error("Form controls are null");
      return;
    }
  
    this.loginData.login = loginControl.value;
    this.loginData.mdp = passwordControl.value;
    console.log("Login Data:", this.loginData);

    this.loginService.login(this.loginData).subscribe(
      (data) => {
        console.log("Login successful:", data);
        alert("Login successful");
        this.router.navigate(['/collab']);
      },
      (error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
      }
    );
  }

  login() {
    this.formSubmit = true;
    this.onSubmit(); // Trigger the same logic as onSubmit when the button is clicked
  }
}
