import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITrip } from 'src/app/models/trip';

@Component({
  selector: 'app-current-trip',
  templateUrl: './current-trip.component.html'
})
export class CurrentTripComponent {
  _trip: ITrip;
  @Input()
  set trip(value: ITrip) {
    this._trip = value;
  }
  get trip(): ITrip {
    return this._trip;
  }
  @Output()
  tripFinished: EventEmitter<any>;
  constructor() {
    this.tripFinished = new EventEmitter<any>();
  }
  finishTrip() {
    this.tripFinished.emit(true);
  }
}
