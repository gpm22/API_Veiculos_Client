import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OwnerService } from '../../shared/services/owener.service';
import { OwnerStateService } from '../../shared/services/owner-state.service';
import { Router } from '@angular/router';
import { Owner } from '../../models/owner';
import { HttpErrorResponse } from '@angular/common/http';
import { OwnerFormComponent } from '../../shared/components/owner-form/owner-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, FormsModule, OwnerFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public error?: string;
  public cpfOrEmail: string = '';
  public user?: Owner;
  public addingNewUser: boolean = false;

  constructor(
    private ownerService: OwnerService,
    private ownerStateService: OwnerStateService,
    private router: Router
  ){
    this.ownerStateService.user.subscribe(
      user => {
        this.user = user;
    });
  }

  sendLoginRequest(){
    this.ownerService
        .getUser(this.cpfOrEmail)
        .subscribe({
          next: owner => {
            if(owner){
              this.error = undefined;
              this.ownerStateService.setUser(owner);
              this.routeToVehicles();
            }},
          error: (errorResponse : HttpErrorResponse) => {
            this.error = errorResponse.error.message;;
        }});
  }

  enableAddingUser(){
    this.error = undefined;
    this.addingNewUser = true;
  }

  disallowAddingUser(){
    this.addingNewUser = false;
  }

  addUser(newUser: Owner){
    this.ownerService
        .save(newUser)
        .subscribe({
          next: owner => {
            this.error = undefined;
            this.addingNewUser = false;
            this.ownerStateService.setUser(owner);
            this.routeToVehicles();
          },
          error: (errorResponse : HttpErrorResponse) => {
            this.error = errorResponse.error.message;;
        }});
  }

  private routeToVehicles(){
    this.router.navigate(['/vehicles']);
  }

}
