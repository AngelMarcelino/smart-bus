import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  user: IUser;
  private isEdit = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(data => {
        if (data.id) {
          this.isEdit = true;
          this.userService.get(data.id)
            .subscribe(user => {
              this.user = user;
              this.userForm.setValue({
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                balance: user.balance
              });
            });
        }
      });
  }
  userForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    balance: ['', Validators.required],
    email: ['', Validators.required],
    id: [0]
  });
  onSubmit() {
    this.user = {
      ...this.user,
      id: this.userForm.controls['id'].value || 0,
      name: this.userForm.controls['name'].value,
      lastName: this.userForm.controls['lastName'].value,
      balance: this.userForm.controls['balance'].value,
    };
    this.save();
  }
  save() {
    let observable: Observable<any>;
    if (!this.isEdit) {
      observable = this.userService.create(this.user);
    } else {
      observable = this.userService.update(this.user);
    }
    observable.subscribe(() => {
      this.router.navigate(['/', 'users']);
    });
  }
}
