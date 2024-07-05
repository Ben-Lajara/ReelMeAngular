import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, map } from 'rxjs';
import { TraduccionService } from '../traduccion.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

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
  perfil: Observable<string>;

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private traduccionService: TraduccionService,
    private route: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
    this.rolesUsuario = this.authService.rolesUsuario;
    this.isAdmin$ = this.authService.isAdmin;
    const defaultLanguage = this.traduccionService.getDefaultLanguage();
    this.traduccionService.setLanguage(defaultLanguage);
    this.perfil = this.authService.currentPerfil;
  }

  switchLanguage(language: string) {
    this.traduccionService.setLanguage(language);
  }

  logout(): void {
    this.authService.logout();
  }
}
