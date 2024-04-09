import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Owner } from '../../models/owner'; 

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private base_owner_path_url: string = `${environment.api_veiculos}/${environment.api_veiculos_owner}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(emailOrCPF: string){
    return this.httpClient.get<Owner>(this.createOwnerURL(emailOrCPF));
  }

  save(owner: Owner) {
    return this.httpClient.post<Owner>(this.base_owner_path_url, owner);
  }

  update(emailOrCPF: string, owner: Owner) {
    return this.httpClient.put<Owner>(this.createOwnerURL(emailOrCPF), owner);
  }

  private createOwnerURL = (emailOrCpf: string) => 
    `${this.base_owner_path_url}/${emailOrCpf}`;

  areUsersEqual(firstUser?: Owner, secondUser?: Owner){
    if(!(firstUser && secondUser))
      return false;

    return firstUser.birthDate == secondUser.birthDate && firstUser.name == secondUser.name && firstUser.cpf == secondUser.cpf && firstUser.email == secondUser.email;
  }
}