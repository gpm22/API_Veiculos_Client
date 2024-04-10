import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleBrand, VehicleModel, VehicleType, VehicleYear } from '../../../models/api-fipe/models';
import { ApiFipeClientService } from '../../../shared/services/api-fipe-client.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss'
})
export class AddVehicleComponent {

  objectKeys = Object.keys;

  @Output() cancel: EventEmitter<any> = new EventEmitter(); 

  vehicleTypes = VehicleType;
  vehicleBrands: VehicleBrand[] = [];
  vehicleModels: VehicleModel[] = [];
  vehicleYears: VehicleYear[] = [];

  vehicleType: string = "";
  vehicleBrand?: VehicleBrand;
  vehicleModel?: VehicleModel;
  vehicleYear?: VehicleYear;

  brandError: string = "";
  modelError: string = "";
  yearError: string = "";

  constructor(
    private apiFipeClient: ApiFipeClientService
  ) {}

  getBrands(){
    if(this.vehicleType == "")
      return;

    this.apiFipeClient
        .getBrands(this.vehicleType)
        .subscribe({
          next: (brands) => {
            this.vehicleBrands = brands;
            this.brandError = "";
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.brandError = errorResponse.error;
          }
        })
  }

  getModels(){
    if(!this.vehicleBrand)
      return;

    this.apiFipeClient
        .getModels(this.vehicleType, this.vehicleBrand.codigo)
        .subscribe({
          next: (models) => {
            this.vehicleModels = models;
            this.modelError = "";
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.modelError = errorResponse.error;
          }
        })
  }

  getYears(){
    if(!(this.vehicleModel && this.vehicleBrand))
      return;

    this.apiFipeClient
        .getYears(this.vehicleType, this.vehicleBrand.codigo, this.vehicleModel.codigo)
        .subscribe({
          next: (years) => {
            this.vehicleYears = years;
            this.yearError = "";
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.yearError = errorResponse.error;
          }
        })
  }

  emitCancel(){
    this.cancel.emit();
  }

  addVehicle(){
    console.log("add vehicle")
    console.log(this.vehicleType)
    console.log(this.vehicleBrand)
    console.log(this.vehicleModel)
    console.log(this.vehicleYear)
  }
}
