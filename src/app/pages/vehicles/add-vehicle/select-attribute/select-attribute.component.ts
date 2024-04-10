import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-attribute',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './select-attribute.component.html',
  styleUrl: './select-attribute.component.scss'
})
export class SelectAttributeComponent {

  @Input() attribute?:string;
  @Input() attributeList?: any[];
  @Input() attributeHolder?: any;
  @Output() populateNextList: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() attributeHolderChange = new EventEmitter<any>;

  emitPopulate(){
    this.attributeHolderChange.emit(this.attributeHolder);
    this.populateNextList.emit();
  }
}
