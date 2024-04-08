import { Component } from '@angular/core';
import { OwnerStateService } from '../../services/owner-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    private ownerStateService: OwnerStateService,
    private router: Router
  ){}

  logOut() {
    this.ownerStateService.setUser(undefined);
    this.router.navigate(['/home']);
  }
}
