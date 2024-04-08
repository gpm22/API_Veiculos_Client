import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from './home.service';
import { OwnerStateService } from '../../shared/services/owner-state.service';
import { Router } from '@angular/router';
import { Owner } from '../../models/owner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public error?: string;
  public cpfOrEmail: string = '';
  public user?: Owner;

  constructor(
    private homeService: HomeService,
    private ownerStateService: OwnerStateService,
    private router: Router
  ){
    this.ownerStateService.user.subscribe(
      user => {
        this.user = user;
    });
  }

  sendLoginRequest(){
    this.homeService
        .getUser(this.cpfOrEmail)
        .subscribe(owner => {
          if(owner){
            this.error = undefined;
            this.ownerStateService.setUser(owner);
            this.router.navigate(['/vehicles']);
          } else {
            this.error = `User with data ${this.cpfOrEmail} does not exist!`;
          }
        });
  }
}
