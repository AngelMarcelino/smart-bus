import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  public users;
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.getusers();
  }
  getusers() {
    this.userService.getAll()
      .subscribe(users => {
        this.users = users;
      });
  }

  delete(id: number) {
    if (confirm('¿Estas seguro que deseas eliminar?')) {
      this.userService.delete(id)
        .subscribe(() => {
          this.getusers();
        });
    }
  }

  edit(id: number) {
    this.router.navigate(['/', 'users', 'edit', id]);
  }
}
