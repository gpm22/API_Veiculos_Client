import { CanActivateFn } from '@angular/router';
import { OwnerStateService } from '../shared/services/owner-state.service';
import { Injectable, inject } from '@angular/core';
import { Owner } from '../models/owner';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
class PermissionService {

  private user?: Owner;
  constructor(
    private ownerStateService: OwnerStateService,
    private router: Router
  ){
    this.ownerStateService.user.subscribe(user => {
      this.user = user;
    });
  }

  canActivate(){
    if(this.user)
      return true;

    this.router.navigate(['/unauthorized']);
    return false;
  }

  canActivateLogged(){
    if(!this.user)
      return true;

    this.router.navigate(['/vehicles']);
    return false;
  }
}


export const apiGuard: CanActivateFn = (route: any, state: any) => {
  return inject(PermissionService).canActivate();
};

export const apiGuardLogged: CanActivateFn = (route: any, state: any) => {
  return inject(PermissionService).canActivateLogged();
};
