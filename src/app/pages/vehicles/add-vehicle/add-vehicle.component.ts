import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleType } from '../../../models/api-fipe/models';

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
  vehicleType: string = "";
  vehicleBrand: string = "";
  vehicleModel: string = "";
  vehicleYear: string = "";

  emitCancel(){
    this.cancel.emit();
  }

  addVehicle(){

  }
}
