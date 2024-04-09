import { Component } from '@angular/core';
import { OwnerStateService } from '../../shared/services/owner-state.service';
import { OwnerService } from '../../shared/services/owener.service';
import { Owner } from '../../models/owner';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { formatDate, NgIf } from '@angular/common';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NavbarComponent, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  public error?: string;
  public user?: Owner;
  public editing: boolean;
  public editUserForm = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      birthDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
    }
  )


  constructor(
    private ownerStateService: OwnerStateService,
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    private router: Router
  ){
    this.ownerStateService.user.subscribe(user => {
      this.user = user;
      this.editUserForm = this.formBuilder.group(
        {
          name: [user.name, Validators.required],
          email: [user.email, [Validators.email, Validators.required]],
          cpf: [user.cpf, Validators.required],
          birthDate: [this.formatDateFromDD_MM_YY(user.birthDate), Validators.required],
        }
    )})
    this.editing = false;
  }

  allowEditing(){
    this.error = undefined;
    this.editing = true;
  }

  disallowEditing(){
    this.editing = false;
  }

  updateUser(){
    if(!this.user || this.editUserForm.invalid)
      return;

    let formValue = this.editUserForm.value;

    let updateUser: Owner = {
      name: formValue.name? formValue.name : "",
      email: formValue.email? formValue.email: "",
      cpf: formValue.cpf? formValue.cpf: "",
      birthDate: this.formatDateFromYYYY_MM_DD(formValue.birthDate)
    };

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

  private formatDateFromYYYY_MM_DD(strDate?: string | null) : string {
    if(!strDate)
      return "";

    let year = strDate.slice(0, 4);
    let month = strDate.slice(5, 7);
    let day = strDate.slice(-2);
    return `${day}/${month}/${year}`;
  }

  private formatDateFromDD_MM_YY(strDate?: string | null) : string {
    if(!strDate)
      return "";

    let year = strDate.slice(-4);
    let month = strDate.slice(3, 5);
    let day = strDate.slice(0,2);
    return `${year}-${month}-${day}`;
  }
}
