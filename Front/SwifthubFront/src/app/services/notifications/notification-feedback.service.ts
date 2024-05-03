import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

var sockJS= require("sockjs-client");
var Stomp= require("stompjs");

@Injectable({
  providedIn: 'root'
})
export class NotificationFeedbackService {

  protected wsUrl = `${environment.API_URL}/api/workshop/socket`;
  constructor() { }

  // oppening cnx with backendSocket 
  public connect(){
    let socket=new sockJS(this.wsUrl);
    let stompClient=Stomp.over(socket)
    return stompClient;
  }



}
