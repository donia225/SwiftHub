import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {RegisterRequest} from "../../BackOffice/Model/RegisterRequest";
import {AuthenticationResponse} from "../../BackOffice/Model/AuthenticationResponse";
import {VerificationRequest} from "../../BackOffice/Model/VerificationRequest";
import {AuthenticationRequest} from "../../BackOffice/Model/AuthenticationRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiServerUrl: string = `${environment.API_URL}/api/user`;


  constructor(
    private httpClient:HttpClient
  ) { }

  register(
    registerRequest: RegisterRequest
  ){
    return this.httpClient.post<AuthenticationResponse>(`${this.apiServerUrl}/register`,registerRequest);
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.httpClient.post<AuthenticationResponse>
    (`${this.apiServerUrl}/verify`, verificationRequest);
  }


  login(
    authRequest: AuthenticationRequest
  ) {
    return this.httpClient.post<AuthenticationResponse>(`${this.apiServerUrl}/authenticate`,authRequest)

  }
}
