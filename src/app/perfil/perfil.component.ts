import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { CONFIG } from 'config';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  animations: [
    trigger('fade', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [animate('300ms ease-in')]),
      transition('visible => hidden', [animate('300ms ease-out')]),
    ]),
  ],
})
export class PerfilComponent implements OnInit {
  @Input() usuario: any;
  email = '';
  apodo = '';
  direccion = '';
  bio = '';
  username = '';
  apiUrl = CONFIG.apiUrl;
  exito = false;
  error = false;
  mensaje = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUsername.subscribe((username) => {
      this.username = username;
    });
  }

  seguidos: any[] = [];
  peliculas: { [key: string]: any } = {};
  ids: any[] = [];

  ngOnInit(): void {
    this.getUser().subscribe((res: any) => {
      this.usuario = res;
      this.email = this.usuario.email ? this.usuario.email : '';
      this.apodo = this.usuario.apodo ? this.usuario.apodo : '';
      this.direccion = this.usuario.direccion ? this.usuario.direccion : '';
      this.bio = this.usuario.bio ? this.usuario.bio : '';
    });
  }

  onSubmit() {
    this.http
      .put(
        `${this.apiUrl}/usuario`,
        {},
        {
          params: {
            nombre: this.usuario.nombre,
            email: this.email,
            apodo: this.apodo,
            direccion: this.direccion,
            bio: this.bio,
          },
        }
      )
      .subscribe(
        (success) => {
          this.mostrarExito();
        },
        (error) => {
          this.mostrarError();
        }
      );
  }

  getUser() {
    return this.http.get(`${this.apiUrl}/usuario/${this.username}`);
  }

  mostrarExito() {
    this.error = false;
    this.exito = true;
    this.mensaje = true;
    setTimeout(() => {
      this.mensaje = false;
    }, 5000);
    setTimeout(() => {
      this.exito = false;
    }, 6000);
  }

  mostrarError() {
    this.exito = false;
    this.error = true;
    this.mensaje = true;
    setTimeout(() => {
      this.mensaje = false;
    }, 5000);
    setTimeout(() => {
      this.error = false;
    }, 6000);
  }
}
