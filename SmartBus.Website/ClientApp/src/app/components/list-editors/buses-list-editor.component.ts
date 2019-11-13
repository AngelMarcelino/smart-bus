import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IBus } from 'src/app/models/bus';
import { ListAdministrator } from 'src/app/utils/list-administrator';



@Component( {
  selector: 'app-buses-list-editor',
  templateUrl: './buses-list-editor.component.html'
})
export class BusesListEditorComponent {
  list: ListAdministrator<IBus>;
  constructor() {
    this.list = new ListAdministrator();
    this.busesChange = this.list.elementsChanges;
  }
  @Input()
  set displayList(value: IBus[]) {
    this.list.displayList = value;
  }

  @Input()
  set buses(value: IBus[]) {
    this.list.elements = value;
  }
  @Output()
  busesChange: EventEmitter<IBus[]>;
}
