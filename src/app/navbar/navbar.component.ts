import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  rolesUsuario: Observable<string[]>;
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    console.log(this.isLoggedIn);
    this.currentUsername = this.authService.currentUsername;
    this.rolesUsuario = this.authService.rolesUsuario;
    this.isAdmin$ = this.authService.isAdmin;
    console.log(this.isAdmin$);
  }

  logout(): void {
    this.authService.logout();
  }
}
