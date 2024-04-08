import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from '../../models/vehicle';
import { OwnerStateService } from '../../shared/services/owner-state.service';
import { Owner } from '../../models/owner';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehiclesComponent{

  public vehicles: Vehicle[] = [];
  public user?: Owner;

  constructor(
    private vehiclesService: VehiclesService,
    private ownerStateService: OwnerStateService,
    private changeDetectorRef: ChangeDetectorRef
  ){
    this.ownerStateService.user.subscribe(
      user => {
        this.user = user;
        this.updatedVehicles();
    });
  }

  updatedVehicles(){
    this.vehiclesService
        .getAll()
        .subscribe(vehicles => {
          if(this.user?.vehicles){
            let map = this.user?.vehicles?.map( v => v.model );
            this.vehicles = vehicles.filter(v => !map.includes(v.model));
          } else {
            this.vehicles = vehicles
          }
          this.changeDetectorRef.detectChanges();
        });
  }


  registerVehicle(vehicleId?: string): void{
    if(!vehicleId || !this.user){
      return;
    }
      
    this.vehiclesService
        .addVehicleToUser(this.user.email, vehicleId)
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
