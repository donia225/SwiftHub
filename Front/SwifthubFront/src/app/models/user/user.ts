import { Role } from "src/app/enums/role";

export class User {
      id!:string ;
      username!:string;
      password!:string;
      email!:string;
      className!:string;
      department!:string;
      managedService!:string;
      role!:Role;
      ImageUrl!:string;
}
