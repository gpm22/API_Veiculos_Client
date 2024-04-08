import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../app.config';
import { Vehicle } from '../../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

    private base_vehicles_path_url: string = `${environment.api_veiculos}/${environment.api_veiculos_vehicle}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll() {
    return this.httpClient.get<Vehicle[]>(this.base_vehicles_path_url);
  }

  getVehicleById(id: number){
    let url: string = `${this.base_vehicles_path_url}/${id}`;
    return this.httpClient.get<Vehicle[]>(url);
  }

  save(vehicle: Vehicle) {
    return this.httpClient.post<Vehicle>(this.base_vehicles_path_url, vehicle);
  }

  addVehicleToUser(userEmail: string, vehicleId: string){
    return this.httpClient.put<Vehicle>(this.register_vehicle_to_user_url(userEmail, vehicleId), "");
  }

  removeVehicleFromUser(userEmail: string, vehicleId: string){
    return this.httpClient.delete<Vehicle>(this.register_vehicle_to_user_url(userEmail, vehicleId));
  }

  private register_vehicle_to_user_url = (userEmail: string, vehicleId: string) => 
    `${environment.api_veiculos}/${environment.api_veiculos_owner}/${userEmail}/${environment.api_veiculos_register_vehicle}/${vehicleId}`;
}