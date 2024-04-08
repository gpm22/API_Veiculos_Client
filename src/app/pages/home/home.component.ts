import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from './home.service';
import { OwnerService } from '../../shared/services/owner-service.service';
import { Router } from '@angular/router';
import { Owner } from '../../models/owner';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  public error?: string;
  public cpfOrEmail: string = '';
  public user?: Owner;

  constructor(
    private homeService: HomeService,
    private ownerService: OwnerService,
    private router: Router
  ){
    this.ownerService.user.subscribe(
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
            this.ownerService.setUser(owner);
            this.router.navigate(['/vehicles']);
          } else {
            this.error = `User with data ${this.cpfOrEmail} does not exist!`;
          }
        });
  }
}
