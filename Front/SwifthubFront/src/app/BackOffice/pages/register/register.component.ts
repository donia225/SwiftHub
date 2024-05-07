import { Component } from '@angular/core';
import {RegisterRequest} from "../../Model/RegisterRequest";
import {AuthenticationResponse} from "../../Model/AuthenticationResponse";
import {Router, RouterLink} from "@angular/router";
import {VerificationRequest} from "../../Model/VerificationRequest";
import {Role} from "../../../enums/role";
import {AuthenticationService} from "../../../services/users/authentication.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    RouterLink,
    RippleModule,
    ButtonModule
  ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  roles: string[] = Object.values(Role);
  registerRequest: RegisterRequest={};
   authenticationResponse: AuthenticationResponse = {};
   message='';
  otpCode=''
   constructor(private authService: AuthenticationService,
               private router: Router
               ){}

  registerUser() {
     this.message='';
     this.authService.register(this.registerRequest)
       .subscribe({
         next:(response) =>{
           if(response){
             this.authenticationResponse=response;
           }
           else {
             this.message='Account created Successfuly\n You will be redirect to the Login Page in 3 seconds';
             setTimeout(()=>{
               this.router.navigate(['login'])

             },3000)
           }

         }

       })


  }


  verifyTfa() {
    this.message='';
    const verifyRequest: VerificationRequest={
      email: this.registerRequest.email,
      code: this.otpCode
    }
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next:(response: AuthenticationResponse)=>{
          this.message='Account created Succefully\n You will be redirected to the Welcome  page in 3 secondes';
          setTimeout(()=>{
            window.localStorage.setItem('token',response.accesToken as string);
            window.localStorage.setItem('email', verifyRequest.email as string);
            this.router.navigate(['dashboard']);

          },3000)
        }
      })
  }
}
