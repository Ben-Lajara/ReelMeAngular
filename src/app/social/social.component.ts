import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
})
export class SocialComponent implements OnInit {
  usuarios: any;
  username = '';
  seguidos: any;
  nombre = '';
  apiUrl = 'http://localhost:8080/api';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authService.currentUsername.subscribe((username) => {
      this.username = username;
    });
  }
  getUsuarios() {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  findUsuarios(nombre: string) {
    if (nombre.trim() === '') {
      this.getUsuarios().subscribe((res: any) => {
        this.usuarios = res.map((usuario: any) => {
          // Para ver si el usuario está en la lista de seguidos
          usuario.seguido = this.seguidos.some(
            (seguido: any) => seguido.usuarioSeguido.nombre === usuario.nombre
          );

          return usuario;
        });
        console.log(this.usuarios);
      });
    } else {
      this.http
        .get(`${this.apiUrl}/usuarios/${nombre}`)
        .pipe(
          catchError((error) => {
            if (error.status === 404) {
              this.getUsuarios();
            }
            return of();
          })
        )
        .subscribe((res: any) => {
          this.usuarios = res.map((usuario: any) => {
            // Para ver si el usuario está en la lista de seguidos
            usuario.seguido = this.seguidos.some(
              (seguido: any) => seguido.usuarioSeguido.nombre === usuario.nombre
            );

            return usuario;
          });
        });
    }
  }

  getSeguidos() {
    return this.http.get(
      `${this.apiUrl}/usuarios/seguidosPor/${this.username}`
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      //this.username = params['username'];
      console.log(this.username);

      this.getSeguidos().subscribe((res: any) => {
        this.seguidos = res;
        console.log(this.seguidos);
        this.getUsuarios().subscribe((res: any) => {
          this.usuarios = res.map((usuario: any) => {
            // Comprueba si el usuario está en la lista de seguidos
            usuario.seguido = this.seguidos.some(
              (seguido: any) => seguido.usuarioSeguido.nombre === usuario.nombre
            );

            return usuario;
          });
          console.log(this.usuarios);
        });
      });
    });
  }
}
