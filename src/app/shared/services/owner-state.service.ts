import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Owner } from '../../models/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerStateService {

  user: ReplaySubject<any> = new ReplaySubject<any>();
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
