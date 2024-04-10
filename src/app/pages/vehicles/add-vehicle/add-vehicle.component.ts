import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelYear, VehicleBrand, VehicleModel, VehicleType, VehicleYear } from '../../../models/api-fipe/models';
import { ApiFipeClientService } from '../../../shared/services/api-fipe-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VehiclesService } from '../vehicles.service';
import { Vehicle } from '../../../models/vehicle';
import { SelectAttributeComponent } from './select-attribute/select-attribute.component';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, SelectAttributeComponent],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss'
})
export class AddVehicleComponent {

  objectEntries = Object.entries;

  @Output() cancel: EventEmitter<any> = new EventEmitter(); 
  @Output() submitVehicle: EventEmitter<any> = new EventEmitter(); 

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
  addCarError: string = "";

  constructor(
    private apiFipeClient: ApiFipeClientService,
    private vehiclesService: VehiclesService
  ) {}

  handleBrands(){
    this.vehicleModel = undefined;
    this.vehicleBrand = undefined;
    this.vehicleYear = undefined;
    this.getBrands();
  }

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
            this.brandError = errorResponse.error.error;
          }
        })
  }

  handleModels(){
    this.vehicleModel = undefined;
    this.vehicleYear = undefined;

    this.getModels();
  }

  getModels(){
    if(!this.vehicleBrand)
      return;

    this.apiFipeClient
        .getModels(this.vehicleType, this.vehicleBrand.codigo)
        .subscribe({
          next: (modelYears: ModelYear) => {
            this.vehicleModels = modelYears.modelos;
            this.modelError = "";
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.modelError = errorResponse.error.error;
          }
        })
  }

  handleYears(){

    this.vehicleYear = undefined;
    this.getYears();
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
            this.yearError = errorResponse.error.error;
          }
        })
  }

  emitCancel(){
    this.cancel.emit();
  }

  emitSubmit(vehicle: Vehicle){
    this.submitVehicle.emit(vehicle);
  }

  addVehicle(){
    if(!(this.vehicleType && this.vehicleBrand && this.vehicleModel && this.vehicleYear))
      return;

    let vehicleToAdd: Vehicle = {
      type: this.vehicleType,
      brand: this.vehicleBrand.nome,
      model: this.vehicleModel.nome,
      year: this.vehicleYear.nome
    }

    this.vehiclesService
        .save(vehicleToAdd)
        .subscribe({
          next: (vehicle: Vehicle) => {
            this.addCarError = "";
            this.emitSubmit(vehicle);
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.addCarError = errorResponse.error.error;
          }
        });
  }
}
