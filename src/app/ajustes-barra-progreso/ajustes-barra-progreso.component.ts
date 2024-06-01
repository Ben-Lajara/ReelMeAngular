import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ajustes-barra-progreso',
  templateUrl: './ajustes-barra-progreso.component.html',
  styleUrl: './ajustes-barra-progreso.component.css',
})
export class AjustesBarraProgresoComponent {
  @Input() usuario: any;
  @Input() numResenas: any;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  apiUrl = 'http://localhost:8080/api';
  constructor(private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }

  getProgreso() {
    switch (this.usuario.rango) {
      case 'BRONCE':
        return ((this.numResenas - 10) / 15) * 100;
      case 'PLATA':
        return ((this.numResenas - 25) / 25) * 100;
      case 'ORO':
        return 100;
      default:
        return (this.numResenas / 10) * 100;
    }
  }

  getRangoActual() {
    switch (this.usuario.rango) {
      case 'BRONCE':
        return 10;
      case 'PLATA':
        return 25;
      default:
        return 0;
    }
  }

  getTotalToNextRank() {
    switch (this.usuario.rango) {
      case 'BRONCE':
        return 15;
      case 'PLATA':
        return 25;
      case 'ORO':
        return 0;
      default:
        return 10;
    }
  }
}
