import { Component } from '@angular/core';
import { OwnerStateService } from '../../shared/services/owner-state.service';
import { Owner } from '../../models/owner';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  public user?: Owner;

  constructor(
    private ownerStateService: OwnerStateService
  ){
    this.ownerStateService.user.subscribe(user => {
      this.user = user;
    })
  }
}
