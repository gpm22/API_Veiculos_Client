import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { Vehicle } from '../../../models/vehicle';

@Component({
  selector: 'app-vehicles-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './vehicles-table.component.html',
  styleUrl: './vehicles-table.component.scss'
})
export class VehiclesTableComponent {

  @Input({required: true}) vehicles!: Vehicle[];
  @Input({required: true}) buttonMessage!: string;
  @Output() clickButton: EventEmitter<Vehicle> = new EventEmitter<Vehicle>;

  onClick(vehicle: Vehicle){
    this.clickButton.emit(vehicle);
  }

  rotationDayMap(day: number){
    switch(day){
        case 2: return "Monday"
        case 3: return "Tuesday"
        case 4: return "Wednesday"
        case 5: return "Thursday"
        case 6: return "Friday"
        default: return "None"
    }
  }

  typeMap(type: string){
    switch(type){
        case "carros": return "Car"
        case "motos": return "Motocycle"
        case "caminhoes": return "Truck"
        default: return "None"
    }
  }
}
