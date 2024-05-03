import {Injectable} from "@angular/core";
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserDialogsService{


  private _current_dialog!:string
  private _current_user!:User


  get current_dialog(): string {
    return this._current_dialog;
  }

  set current_dialog(value: string) {
    this._current_dialog = value;
  }

  get current_user(): User {
    return this._current_user;
  }

  set current_user(value: User) {
    this._current_user = value;
  }

  constructor() { }
}
