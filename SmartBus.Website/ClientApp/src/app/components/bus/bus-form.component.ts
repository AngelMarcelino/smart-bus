import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusService } from 'src/app/services/bus.service';
import { IBus } from 'src/app/models/bus';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bus-form',
  templateUrl: './bus-form.component.html'
})
export class BusFormComponent {
  bus: IBus;
  private isEdit = false;
  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private router: Router,
    activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(data => {
        if (data.id) {
          this.isEdit = true;
          this.busService.get(data.id)
            .subscribe(bus => {
              this.busForm.setValue(bus);
            });
        }
      });
  }
  busForm = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    id: [0]
  });
  onSubmit() {
    this.bus = {
      id: this.busForm.controls['id'].value || 0,
      brand: this.busForm.controls['brand'].value,
      model: this.busForm.controls['model'].value,
    };
    this.save();
  }
  save() {
    let observable: Observable<any>;
    if (!this.isEdit) {
      observable = this.busService.create(this.bus);
    } else {
      observable = this.busService.update(this.bus);
    }
    observable.subscribe(() => {
      this.router.navigate(['/', 'autobuses']);
    });
  }
}
