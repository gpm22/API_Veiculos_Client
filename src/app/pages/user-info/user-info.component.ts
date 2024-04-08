import { Component } from '@angular/core';
import { OwnerService } from '../../shared/services/owner-service.service';
import { Owner } from '../../models/owner';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  public user?: Owner;

  constructor(
    private ownerService: OwnerService
  ){
    this.ownerService.user.subscribe(user => {
      this.user = user;
    })
  }
}
