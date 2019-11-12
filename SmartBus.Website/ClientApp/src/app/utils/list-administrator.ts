import { WithId } from '../models/with-id';
import { EventEmitter } from '@angular/core';

export class ListAdministrator<T extends WithId> {
  private display: T[];
  private _elements: T[];
  private selectedElementId: string;
  constructor(
  ) {
    this.elementsChanges = new EventEmitter<T[]>();
  }
  set displayList(value: T[]) {
    this.display = value;
  }
  get displayList(): T[] {
    return this.display.filter(e => !this.elements.some(elem => elem.id === e.id));
  }

  set elements(value: T[]) {
    this._elements = value;
  }

  get elements(): T[] {
    return this._elements;
  }

  elementsChanges: EventEmitter<T[]>;

  delete(elementId: number) {
    this.elements = this.elements.filter(e => e.id !== elementId);
    this.elementsChanges.emit(this.elements);

  }

  add() {
    console.log(this.selectedElementId);
    const toAdd = this.display.find(e => e.id === parseInt(this.selectedElementId, 10));
    this.elements = [...(this.elements || []), toAdd];
  }
}
