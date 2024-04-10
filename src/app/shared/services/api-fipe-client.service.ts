import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleBrand, VehicleModel, VehicleYear } from '../../models/api-fipe/models';
import { environment } from '../../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFipeClientService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getBrands(vehicleType: string) : Observable<VehicleBrand[]>{
    return this.httpClient.get<VehicleBrand[]>(this.brandURL(vehicleType));
  }

  getModels(vehicleType: string, brandCode: string ): Observable<VehicleModel[]>{
    return this.httpClient.get<VehicleModel[]>(this.modelURL(vehicleType, brandCode));
  }

  getYears(vehicleType: string, brandCode: string, modelCode: string ) : Observable<VehicleYear[]>{
    return this.httpClient.get<VehicleYear[]>(this.yearURL(vehicleType, brandCode, modelCode));
  }

  brandURL = (vehicleType: string) => `${environment.api_fipe}/${vehicleType}/${environment.api_fipe_brand}`;

  modelURL = (vehicleType: string, brandCode: string ) => `${this.brandURL(vehicleType)}/${brandCode}/${environment.api_fipe_model}`;
  
  yearURL = (vehicleType: string, brandCode: string, modelCode: string ) => `${this.modelURL(vehicleType, brandCode)}/${modelCode}/${environment.api_fipe_year}`;
}
