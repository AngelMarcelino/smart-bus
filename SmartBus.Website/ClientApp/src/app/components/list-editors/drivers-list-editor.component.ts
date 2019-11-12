import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListAdministrator } from 'src/app/utils/list-administrator';
import { IDriver } from 'src/app/models/driver';



@Component( {
  selector: 'app-drivers-list-editor',
  templateUrl: './drivers-list-editor.component.html'
})
export class DriversListEditorComponent {
  list: ListAdministrator<IDriver>;
  constructor() {
    this.list = new ListAdministrator();
    this.driverChanges = this.list.elementsChanges;
  }
  @Input()
  set displayList(value: IDriver[]) {
    this.list.displayList = value;
  }

  @Input()
  set driver(value: IDriver[]) {
    this.list.elements = value;
  }
  @Output()
  driverChanges: EventEmitter<IDriver[]>;
}
