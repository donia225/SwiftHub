import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../layout/service/login.service';
import { Login } from '../../Model/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationRequest} from "../../Model/AuthenticationRequest";
import {AuthenticationResponse} from "../../Model/AuthenticationResponse";
import {AuthenticationService} from "../../../services/users/authentication.service";
import {VerificationRequest} from "../../Model/VerificationRequest";
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/users/user.service';
import { Role } from 'src/app/enums/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  public loginData: Login = new Login('', ''); // Initialize an instance of Login
  public messages: any[] = [];
  users!:User[];
  formSubmit: boolean = false;
  loginForm: FormGroup;
  submitted: boolean = false;
  authRequest: AuthenticationRequest = {};
  otpCode = '';
  authResponse: AuthenticationResponse = {};

  constructor(
    private formBuilder: FormBuilder, private router: Router,
    private authService: AuthenticationService,
    private userService:UserService
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      mdp: ['', Validators.required],
    });
  }



  ngOnInit(): void {
    this.getUsers();
  }

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

    const loggedInUser=this.users.find(user=>user.email==this.loginData.login);
    if (!loggedInUser) {
      console.log("not found!");
      
    }
    console.log(loggedInUser);
    

    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', response.accesToken as string);
            if (loggedInUser?.role==Role.STUDENT) {
              this.router.navigate(['home/content']);
              
            }else{
              this.router.navigate(['dashboard']);
            }
           
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

  //fetch all users
  getUsers(){
    this.userService.getUsers().subscribe(
      res=>{
        this.users=res as User[];
      },
      err=>{
        console.log("couldn't get all users"+ err);
        
      }
    );
  }
}
