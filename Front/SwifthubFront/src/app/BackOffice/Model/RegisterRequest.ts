import {Role} from "../../enums/role";

export interface RegisterRequest{

  username? : string;
  password? : string;
  email? : string;
  className? : string;
  department? : string;
  managedService? : string;
  role?: Role;
  mfaEnabled?: String;
}

