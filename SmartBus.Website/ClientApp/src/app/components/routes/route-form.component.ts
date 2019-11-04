import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouteService } from 'src/app/services/route.service';
import { IRoute } from 'src/app/models/route';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html'
})
export class RouteFormComponent {
  route: IRoute;
  private isEdit = false;
  constructor(
    private fb: FormBuilder,
    private routeService: RouteService,
    private router: Router,
    activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(data => {
        if (data.id) {
          this.isEdit = true;
          this.routeService.get(data.id)
            .subscribe(route => {
              this.routeForm.setValue({
                name: route.name,
                id: route.id,
                firstLeavingHour: (<string>route.firstLeavingHour || ''),
                lastLeavingHour: (<string>route.lastLeavingHour || ''),
                intervalInMinutes: route.intervalInMinutes
              });
            });
        }
      });
  }
  routeForm = this.fb.group({
    name: ['', Validators.required],
    firstLeavingHour: ['', Validators.required],
    lastLeavingHour: ['', Validators.required],
    intervalInMinutes: 15,
    id: [0]
  });
  onSubmit() {
    this.route = {
      id: this.routeForm.controls['id'].value || 0,
      name: this.routeForm.controls['name'].value,
      lastLeavingHour: this.routeForm.controls['lastLeavingHour'].value,
      firstLeavingHour: this.routeForm.controls['firstLeavingHour'].value,
      intervalInMinutes: this.routeForm.controls['intervalInMinutes'].value
    };
    this.save();
  }
  save() {
    let observable: Observable<any>;
    if (!this.isEdit) {
      observable = this.routeService.create(this.route);
    } else {
      observable = this.routeService.update(this.route);
    }
    observable.subscribe(() => {
      this.router.navigate(['/', 'routes']);
    });
  }
}
