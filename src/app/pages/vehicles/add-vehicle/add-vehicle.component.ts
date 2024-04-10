import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleBrand, VehicleModel, VehicleType, VehicleYear } from '../../../models/api-fipe/models';

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
