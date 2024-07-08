import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'config';
@Component({
  selector: 'app-ajustes-personalizar',
  templateUrl: './ajustes-personalizar.component.html',
  styleUrl: './ajustes-personalizar.component.css',
})
export class AjustesPersonalizarComponent implements OnInit {
  @Input() usuario: any;
  color: any;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  apiUrl = CONFIG.apiUrl;
  constructor(private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }
  ngOnInit(): void {
    this.color = this.usuario.color;
  }

  setColor(colorSeleccionado: string) {
    if (colorSeleccionado != '') {
      this.color = colorSeleccionado;
    } else {
      this.color = null;
    }
    const nuevoColor = this.color;
    this.http
      .put(
        `${this.apiUrl}/usuario/color`,
        {},
        {
          params: {
            nombre: this.usuario.nombre,
            color: this.color,
          },
        }
      )
      .subscribe(
        (success) => {
          this.usuario.color = this.color;
        },
        (error) => console.log('Color Update Error', error.error)
      );
  }
}
