import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-seguidos',
  templateUrl: './seguidos.component.html',
  styleUrls: ['./seguidos.component.css'],
})
export class SeguidosComponent implements OnInit {
  username = '';
  seguidos: any;
  seguidosUsuario: any;
  currentUser = '';
  apiUrl = 'http://localhost:8080/api';
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
      this.getSeguidosUsuario().subscribe((res: any) => {
        this.seguidosUsuario = res;
        console.log(this.seguidosUsuario);
        this.getSeguidos().subscribe((res: any) => {
          this.seguidos = res.map((usuario: any) => {
            usuario.usuarioSeguido.seguido = this.seguidosUsuario.some(
              (seguido: any) =>
                seguido.nombreUsuario.nombre === this.currentUser
            );
            return usuario;
          });
          console.log(this.seguidos);
        });
      });
    });
  }

  getSeguidos() {
    return this.http.get(
      `${this.apiUrl}/usuarios/seguidosPor/${this.username}`
    );
  }

  getSeguidosUsuario() {
    return this.http.get(
      `${this.apiUrl}/usuarios/seguidosPor/${this.currentUser}`
    );
  }
}
