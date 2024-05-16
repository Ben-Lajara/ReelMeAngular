import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restablecimiento',
  templateUrl: './restablecimiento.component.html',
  styleUrls: ['./restablecimiento.component.css'],
})
export class RestablecimientoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  token = '';
  pword1 = '';
  pword2 = '';
  usuario: any;
  exito = false;
  apiUrl = 'http://localhost:8080/api';

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.token = params['token'];
      this.getUsuario().subscribe((res) => {
        this.usuario = res;
      });
    });
  }

  onSubmit(): void {
    this.restablecerPword();
  }

  getUsuario() {
    return this.http.get(`${this.apiUrl}/usuario/tokenPword`, {
      params: { token: this.token },
    });
  }

  restablecerPword() {
    if (this.pword1 !== this.pword2) {
      console.log('Contraseña incorrecta');
    } else {
      this.usuario.pword = this.pword2;
      this.http
        .put(`${this.apiUrl}/usuario/cambiarPword`, this.usuario)
        .subscribe(
          (success) => {
            console.log('Password Updated');
            this.pword1 = '';
            this.pword2 = '';
            this.exito = true;
          },
          (error) => console.log('Password Update Error', error.error)
        );
    }
  }
}
