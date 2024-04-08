import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { VehiclesService } from './vehicles.service';
import { OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [NgFor],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {

  public vehicles: Vehicle[] = [];

  constructor(
    private vehiclesService: VehiclesService
  ){}

  ngOnInit(): void {
    this.vehiclesService
        .getAll()
        .subscribe(vehicles => this.vehicles = vehicles);
  }

  registerVehicle(vehicleId?: string): void{
    if(!vehicleId){
      return;
    }
      
    this.vehiclesService
        .addVehicleToUser("126.764.550-44", vehicleId)
        .subscribe(() => alert("registered!"));
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
