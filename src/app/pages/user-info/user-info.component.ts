import { Component } from '@angular/core';
import { OwnerStateService } from '../../shared/services/owner-state.service';
import { OwnerService } from '../../shared/services/owener.service';
import { Owner } from '../../models/owner';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OwnerFormComponent } from '../../shared/components/owner-form/owner-form.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NavbarComponent, NgIf, OwnerFormComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  public error?: string;
  public user?: Owner;
  public editing: boolean;

  constructor(
    private ownerStateService: OwnerStateService,
    private ownerService: OwnerService,
    private router: Router
  ){
    this.ownerStateService.user.subscribe(user => {
      this.user = user;
    })
    this.editing = false;
  }

  allowEditing(){
    this.error = undefined;
    this.editing = true;
  }

  disallowEditing(){
    this.editing = false;
  }

  updateUser(updateUser: Owner){
    if(!this.user)
      return;

    if(this.ownerService.areUsersEqual(updateUser, this.user)){
      this.editing = false;
      return;
    }

    this.ownerService
        .update(this.user.email, updateUser)
        .subscribe({
          next: owner => {
            this.editing = false;
            this.ownerStateService.setUser(owner);
          },
          error: (errorResponse : HttpErrorResponse) => {
            this.error = errorResponse.error.message;
        }})
  }

  removeUser(){
    if(!this.user)
      return;

    //TODO add modal to ask user again

    this.ownerService
        .delete(this.user.email)
        .subscribe({
          next: () => {
            this.ownerStateService.setUser(undefined);
            this.router.navigate(["/home"]);
          },
          error: (errorResponse: HttpErrorResponse) => {
            alert("Error while deleting user: " + errorResponse.error.message);
          }})
  }
}
