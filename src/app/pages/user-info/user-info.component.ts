import { Component } from '@angular/core';
import { OwnerStateService } from '../../shared/services/owner-state.service';
import { Owner } from '../../models/owner';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { formatDate, NgIf } from '@angular/common';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NavbarComponent, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
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
    private formBuilder: FormBuilder
  ){
    this.ownerStateService.user.subscribe(user => {
      this.user = user;
      this.editUserForm = this.formBuilder.group(
        {
          name: [user.name, Validators.required],
          email: [user.email, [Validators.email, Validators.required]],
          cpf: [user.cpf, Validators.required],
          birthDate: [formatDate(new Date(user.birthDate), 'yyyy-MM-dd', 'en'), Validators.required],
        }
    )})
    this.editing = false;
  }

  allowEditing(){
    this.editing = true;
  }

  updateUser(){
    console.log("updating")
    console.log(this.user)
    console.log(this.editUserForm.valid)
    console.log(this.editUserForm.errors)
    console.log(this.editUserForm.get('email')?.valid)
    console.log(this.editUserForm.value)
  }
}
