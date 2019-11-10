import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-driver',
  templateUrl: './nav-driver.component.html'
})
export class NavDriverComponent {
  @Output()
  logOut: EventEmitter<any>;
  constructor() {
    this.logOut = new EventEmitter<any>();
  }

  onLogOut() {
    this.logOut.emit('cy');
  }
}
