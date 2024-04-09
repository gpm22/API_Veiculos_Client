import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Owner } from '../../models/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerStateService {

  user: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor() {
    let storedOwner = localStorage.getItem('storedOwner');
    if(storedOwner)
      this.setUser(JSON.parse(storedOwner));
  }

  setUser(user?: Owner){
    if(user){
      localStorage.setItem('storedOwner', JSON.stringify(user));
      this.user.next(user);
    } else {
      localStorage.removeItem('storedOwner');
      this.user.next(false);
    }
  }
}
