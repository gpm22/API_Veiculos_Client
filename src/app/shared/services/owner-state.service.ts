import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Owner } from '../../models/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerStateService {

  user: ReplaySubject<any> = new ReplaySubject<any>();
  constructor() { }

  setUser(user: Owner){
    this.user.next(user);
  }
}
