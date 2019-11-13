import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListAdministrator } from 'src/app/utils/list-administrator';
import { IDriver } from 'src/app/models/driver';
import { IDriverFromDb } from 'src/app/models/route';



@Component( {
  selector: 'app-drivers-list-editor',
  templateUrl: './drivers-list-editor.component.html'
})
export class DriversListEditorComponent {
  list: ListAdministrator<IDriverFromDb>;
  constructor() {
    this.list = new ListAdministrator();
    this.driverChange = this.list.elementsChanges;
  }
  @Input()
  set displayList(value: IDriverFromDb[]) {
    this.list.displayList = value;
  }

  @Input()
  set driver(value: IDriverFromDb[]) {
    this.list.elements = value;
  }
  @Output()
  driverChange: EventEmitter<IDriverFromDb[]>;
}
