import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../layout/service/login.service';
import { Login } from '../../Model/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationRequest} from "../../Model/AuthenticationRequest";
import {AuthenticationResponse} from "../../Model/AuthenticationResponse";
import {AuthenticationService} from "../../../services/users/authentication.service";
import {VerificationRequest} from "../../Model/VerificationRequest";

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
  authRequest: AuthenticationRequest = {};
  otpCode = '';
  authResponse: AuthenticationResponse = {};

  constructor(
    private formBuilder: FormBuilder, private router: Router,
    private authService: AuthenticationService
  ) {
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

    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', response.accesToken as string);
            this.router.navigate(['dashboard']);
          }
        }
      });
  }


  login() {
    this.formSubmit = true;
    this.onSubmit(); // Trigger the same logic as onSubmit when the button is clicked
  }

  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accesToken as string);
          this.router.navigate(['dashboard']);
        }
      });

  }
}
