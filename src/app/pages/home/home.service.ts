import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Owner } from '../../models/owner';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

    private base_owner_path_url: string = `${environment.api_veiculos}/${environment.api_veiculos_owner}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(emailOrCPF: string){
    let url: string = `${this.base_owner_path_url}/${emailOrCPF}`;
    return this.httpClient.get<Owner>(url);
  }

  save(vehicle: Owner) {
    return this.httpClient.post<Owner>(this.base_owner_path_url, vehicle);
  }

}