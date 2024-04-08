import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Owner } from '../../models/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  user: Subject<Owner> = new Subject<Owner>();
  constructor() { }

  setUser(user: Owner){
    this.user.next(user);
  }
}
