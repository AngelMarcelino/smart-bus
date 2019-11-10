import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html'
})
export class NavUserComponent {
  @Output()
  logOut: EventEmitter<any>;
  constructor() {
    this.logOut = new EventEmitter<any>();
  }

  onLogOut() {
    this.logOut.emit('cy');
  }
}
