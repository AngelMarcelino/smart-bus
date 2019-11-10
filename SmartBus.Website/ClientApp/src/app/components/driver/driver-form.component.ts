import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DriverService } from 'src/app/services/driver.service';
import { IDriver } from 'src/app/models/driver';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html'
})
export class DriverFormComponent {
  driver: IDriver;
  private isEdit = false;
  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    private router: Router,
    activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(data => {
        if (data.id) {
          this.isEdit = true;
          this.driverService.get(data.id)
            .subscribe(driver => {
              this.driverForm.setValue({
                name: driver.name,
                lastName: driver.lastName,
                email: driver.email,
                id: driver.id,
                registerDate: (<string>driver.registerDate || '').split('T')[0],
                phone: driver.phone
              });
            });
        }
      });
  }
  driverForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    registerDate: ['', Validators.required],
    id: [0]
  });
  onSubmit() {
    this.driver = {
      id: this.driverForm.controls['id'].value || 0,
      name: this.driverForm.controls['name'].value,
      lastName: this.driverForm.controls['lastName'].value,
      email: this.driverForm.controls['email'].value,
      phone: this.driverForm.controls['phone'].value,
      registerDate: this.driverForm.controls['registerDate'].value
    };
    this.save();
  }
  save() {
    let observable: Observable<any>;
    if (!this.isEdit) {
      observable = this.driverService.create(this.driver);
    } else {
      observable = this.driverService.update(this.driver);
    }
    observable.subscribe(() => {
      this.router.navigate(['/', 'drivers']);
    });
  }
}
