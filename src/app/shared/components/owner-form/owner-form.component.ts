import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatDate, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Owner } from '../../../models/owner';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './owner-form.component.html',
  styleUrl: './owner-form.component.scss'
})
export class OwnerFormComponent implements OnInit {

  @Input() error?: string;
  @Input({required: true}) submitMessage!: string;
  @Input() user?: Owner;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter(); 
  @Output() cancel: EventEmitter<any> = new EventEmitter(); 

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ){
    this.formGroup = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required]],
        birthDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      })
  }

  ngOnInit(): void {
    if(this.user){
      this.formGroup = this.formBuilder.group(
        {
          name: [this.user.name, Validators.required],
          email: [this.user.email, [Validators.email, Validators.required]],
          cpf: [this.user.cpf, Validators.required],
          birthDate: [this.formatDateFromDD_MM_YY(this.user.birthDate), Validators.required],
        });
    } 
  }

  emitSubmit(){
    if(!this.formGroup || this.formGroup.invalid)
      return;

    let formValue = this.formGroup.value;

    let newUser: Owner = {
      name: formValue.name? formValue.name : "",
      email: formValue.email? formValue.email: "",
      cpf: formValue.cpf? formValue.cpf: "",
      birthDate: this.formatDateFromYYYY_MM_DD(formValue.birthDate)
    };
    
    this.onSubmit.emit(newUser);
  }

  emitCancel(){
    this.cancel.emit();
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
