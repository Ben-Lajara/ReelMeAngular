import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  username = '';
  apiUrl = CONFIG.apiUrl;
  exito = false;
  error = false;
  mensaje = '';
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUsername.subscribe((username) => {
      this.username = username;
      console.log(this.username);
    });
  }

  seguidos: any[] = [];
  peliculas: { [key: string]: any } = {};
  ids: any[] = [];
  usuario: any;

  ngOnInit(): void {
    this.getUser().subscribe((res: any) => {
      this.usuario = res;
      console.log(this.usuario);
    });
  }

  onSubmit() {
    this.http.put(`${this.apiUrl}/usuario`, this.usuario).subscribe(
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

  deleteUser() {
    console.log('Eliminando usuario');
    console.log(this.usuario);
    this.http
      .delete(`${this.apiUrl}/usuario/delete`, { body: this.usuario })
      .subscribe(
        (success) => {
          console.log('Usuario Eliminado');
          this.router.navigate(['/']);
        },
        (error) => {
          console.log('Error al eliminar usuario', error.error);
        }
      );
  }

  mostrarExito() {
    this.mensaje = 'Se han guardado los cambios correctamente';
    this.exito = true;
    setTimeout(() => {
      this.exito = false;
    }, 5000);
  }

  mostrarError() {
    this.mensaje = 'Error al guardar los cambios';
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }
}
