import { Component } from '@angular/core';
import { formatDate, NgIf } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { OwnerService } from '../../shared/services/owener.service';
import { OwnerStateService } from '../../shared/services/owner-state.service';
import { Router } from '@angular/router';
import { Owner } from '../../models/owner';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public error?: string;
  public cpfOrEmail: string = '';
  public user?: Owner;
  public addingNewUser: boolean = false;
  public newUserForm  = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      birthDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
    }
  )

  constructor(
    private ownerService: OwnerService,
    private ownerStateService: OwnerStateService,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.ownerStateService.user.subscribe(
      user => {
        this.user = user;
    });
  }

  sendLoginRequest(){
    this.ownerService
        .getUser(this.cpfOrEmail)
        .subscribe(owner => {
          if(owner){
            this.error = undefined;
            this.ownerStateService.setUser(owner);
            this.routeToVehicles();
          } else {
            this.error = `User with data ${this.cpfOrEmail} does not exist!`;
          }
        });
  }

  enableAddingUser(){
    this.addingNewUser = true;
  }

  addUser(){
    if(this.newUserForm.invalid)
      return;

    let formValue = this.newUserForm.value;

    let newUser: Owner = {
      name: formValue.name? formValue.name : "",
      email: formValue.email? formValue.email: "",
      cpf: formValue.cpf? formValue.cpf: "",
      birthDate: this.formatDateFromYYYY_MM_DD(formValue.birthDate)
    };

    this.ownerService
        .save(newUser)
        .subscribe(owner => {
          this.addingNewUser = false;
          this.ownerStateService.setUser(owner);
          this.routeToVehicles();
        })
  }

  private routeToVehicles(){
    this.router.navigate(['/vehicles']);
  }

  private formatDateFromYYYY_MM_DD(strDate?: string | null) : string {
    if(!strDate)
      return "";

    let year = strDate.slice(0, 4);
    let month = strDate.slice(5, 7);
    let day = strDate.slice(-2);
    return `${day}/${month}/${year}`;
  }
}
