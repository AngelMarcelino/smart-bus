import { Component, OnInit, Input } from '@angular/core';
import { BusTerminalService } from '../services/bus-terminal.service';
import { Route } from '../models/route';
import { Trip } from '../models/trip';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {
  formGroup: FormGroup;
  finishTripForm: FormGroup;
  _currentTrip: Trip;
  @Input()
  set currentTrip(value: Trip) {
    this._currentTrip = value;
  }
  get currentTrip(): Trip {
    return this._currentTrip;
  }
  constructor(
    private busTerminalService: BusTerminalService,
    formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      'user': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.finishTripForm = formBuilder.group({
      'password': ['', Validators.required]
    });
  }

  newPassage() {
    const user = this.formGroup.controls['user'].value;
    const password = this.formGroup.controls['password'].value;
    this.busTerminalService.newPassage(this.currentTrip.id, user, password)
      .subscribe((response: any) => {
        if (response.success) {
          alert('Pase');
        } else {
          alert('Fondos insuficientes');
        }
      });
  }
  ngOnInit() {
  }
}
