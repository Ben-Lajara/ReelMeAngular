import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CONFIG } from 'config';

@Component({
  selector: 'app-card-usuario',
  templateUrl: './card-usuario.component.html',
  styleUrls: ['./card-usuario.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CardUsuarioComponent implements OnInit {
  @Input() usuario: any;
  @Input() username: string = '';
  isLoading = true;
  apiUrl = CONFIG.apiUrl;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.isLoading = false;
  }

  seguir(nombreUsuario: string, usuarioSeguido: string) {
    const body = { nombreUsuario, usuarioSeguido };
    console.log(body);
    return this.http.post(`${this.apiUrl}/usuario/seguir`, body).subscribe(
      (response) => {
        console.log(response);
        this.usuario.seguido = true;
        return response;
      },
      (error) => {
        console.error(error);
        return error;
      }
    );
  }

  dejarDeSeguir(nombreUsuario: string, usuarioSeguido: string) {
    // Las options son necesarias para el delete.
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { nombreUsuario, usuarioSeguido },
    };
    console.log(options.body);
    return this.http
      .delete(`${this.apiUrl}/usuario/dejarDeSeguir`, options)
      .subscribe(
        (response) => {
          console.log(response);
          this.usuario.seguido = false;
          return response;
        },
        (error) => {
          console.error(error);
          return error;
        }
      );
  }
}
