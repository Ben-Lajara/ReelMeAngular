import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CONFIG } from 'config';

@Component({
  selector: 'app-seguidores',
  templateUrl: './seguidores.component.html',
  styleUrls: ['./seguidores.component.css'],
})
export class SeguidoresComponent implements OnInit {
  username = '';
  seguidores: any;
  seguidos: any;
  currentUser = '';
  apiUrl = CONFIG.apiUrl;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      console.log(this.username);
      this.currentUser = localStorage.getItem('username') || '';
      console.log('CurrentUser: ' + this.currentUser);
      this.getSeguidos().subscribe((res: any) => {
        this.seguidos = res;
        console.log(this.seguidos);
        this.getSeguidores().subscribe((res: any) => {
          this.seguidores = res.map((usuario: any) => {
            usuario.nombreUsuario.seguido = this.seguidos.some(
              (seguido: any) =>
                seguido.usuarioSeguido.nombre === usuario.nombreUsuario.nombre
            );
            return usuario;
          });
          console.log(this.seguidores);
        });
      });
    });
  }

  getSeguidores() {
    return this.http.get(
      `${this.apiUrl}/usuarios/seguidoresDe/${this.username}`
    );
  }

  getSeguidos() {
    return this.http.get(
      `${this.apiUrl}/usuarios/seguidosPor/${this.currentUser}`
    );
  }

  findUsuarios(nombre: string) {
    this.getSeguidos().subscribe((res: any) => {
      this.seguidores = res.map((usuario: any) => {
        usuario.seguido = this.seguidos.some(
          (seguido: any) => seguido.usuarioSeguido.nombre === usuario.nombre
        );
        return usuario;
      });
    });
  }
}
