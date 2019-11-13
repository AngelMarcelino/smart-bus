import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html'
})
export class NavAdminComponent {
  @Output()
  logOut: EventEmitter<any>;
  constructor() {
    this.logOut = new EventEmitter<any>();
  }

  onLogOut() {
    this.logOut.emit('cy');
  }
}
