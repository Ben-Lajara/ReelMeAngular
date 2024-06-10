import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'config';

@Component({
  selector: 'app-ajustes-foto-perfil',
  templateUrl: './ajustes-foto-perfil.component.html',
  styleUrl: './ajustes-foto-perfil.component.css',
})
export class AjustesFotoPerfilComponent implements OnInit {
  @Input() usuario: any;
  @Input() username: any;
  @Input() perfil: any;
  fotoSeleccionada: File | null = null;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  imagenesDisponibles: string[] = [];
  imagenSeleccionada = '';
  apiUrl = CONFIG.apiUrl;

  timestamp = new Date().getTime();
  constructor(private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }
  ngOnInit(): void {
    this.cargarImagenesDisponibles();
  }

  cargarImagenesDisponibles() {
    this.imagenesDisponibles = [
      'butacasPerfil.jpg',
      'carretePerfil.jpg',
      'palomitasPerfil.jpg',
      'claquetaPerfil.jpg',
    ];
  }

  seleccionarImagen(imagen: string) {
    this.imagenSeleccionada = imagen;
  }

  onUpload() {
    if (this.imagenSeleccionada) {
      const nuevoPerfil = this.imagenSeleccionada;
      this.http
        .put(
          `${this.apiUrl}/usuario/perfil`,
          {},
          {
            params: {
              nombre: this.username,
              perfil: this.imagenSeleccionada,
            },
          }
        )
        .subscribe(
          (success) => {
            this.perfil = nuevoPerfil;
            localStorage.setItem('perfil', nuevoPerfil);
          },
          (error) => console.log('Upload Error', error.error)
        );
    }
  }
}
