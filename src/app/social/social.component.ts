import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';
import { CONFIG } from 'config';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
})
export class SocialComponent implements OnInit {
  usuarios: any[] = [];
  username = '';
  seguidos: any[] = [];
  nombreControl = new FormControl('');
  apiUrl = CONFIG.apiUrl;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authService.currentUsername.subscribe((username) => {
      this.username = username;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(this.username);
      this.getSeguidos().subscribe((seguidos: any) => {
        this.seguidos = seguidos;
        this.setupBuscador();
      });
    });
  }

  setupBuscador(): void {
    this.nombreControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((nombre) => {
          if (nombre?.trim() === '') {
            return of([]);
          } else {
            return this.findUsuarios(nombre ?? '').pipe(
              catchError((error) => {
                if (error.status === 404) {
                  return of([]);
                }
                return of([]);
              })
            );
          }
        })
      )
      .subscribe((usuarios: any) => {
        this.usuarios = this.marcarUsuariosSeguidos(usuarios, this.seguidos);
      });
  }
  findUsuarios(nombre: string) {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/${nombre}`);
  }

  getSeguidos() {
    return this.http.get<any[]>(
      `${this.apiUrl}/usuarios/seguidosPor/${this.username}`
    );
  }

  marcarUsuariosSeguidos(usuarios: any[], seguidos: any[]): any[] {
    return usuarios.map((usuario) => {
      usuario.seguido = seguidos.some(
        (seguido) => seguido.usuarioSeguido.nombre === usuario.nombre
      );
      return usuario;
    });
  }
}
