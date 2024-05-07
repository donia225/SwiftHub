import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { User } from "../../../models/user/user";
import { UserService } from "../../../services/users/user.service";

@Component({
  selector: 'app-consult-users',
  templateUrl: './consult-users.component.html',
  styleUrls: ['./consult-users.component.scss']
})
export class ConsultUsersComponent implements OnInit {
  users: User[] = [];
  editUser: User | null = null; // Initialize as null
  deleteUser: User | null = null; // Initialize as null

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateUser(user: User | null): void {
    if (user) {
      this.userService.updateUser(user).subscribe(
        (response: User) => {
          console.log(response);
          this.getUsers();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public onDeleteUser(userId: string | undefined): void {
    if (userId) {
      this.userService.deleteUser(userId).subscribe(
        (response: void) => {
          console.log(response);
          this.getUsers();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public searchUsers(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const user of this.users) {
      if (
        user.username.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        user.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
  }

  public onOpenModal(user: User | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit' && user) { // Add null check for user
      this.editUser = user;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete' && user) { // Add null check for user
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteuserModel');
    }
    if (container) { // Check if container is not null before appending
      container.appendChild(button);
      button.click();
    } else {
      console.error('Container is null.');
    }
  }
}
