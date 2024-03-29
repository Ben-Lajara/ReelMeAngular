import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-usuario',
  templateUrl: './card-usuario.component.html',
  styleUrls: ['./card-usuario.component.css']
})
export class CardUsuarioComponent implements OnInit {
  @Input() usuario: any;
  @Input() username: string = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  seguir(nombreUsuario: string, usuarioSeguido: string){
    const body = {nombreUsuario, usuarioSeguido}
    console.log(body);
    return this.http.post(`http://localhost:8080/seguir`, body).subscribe(
      response => {
        console.log(response);
        this.usuario.seguido = true;
        return response;
      },
      error => {
        console.error(error);
        return error;
      }
    )
  }

  dejarDeSeguir(nombreUsuario: string, usuarioSeguido: string){
    // Las options son necesarias para el delete.
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {nombreUsuario, usuarioSeguido},
    };
    console.log(options.body);
    return this.http.delete(`http://localhost:8080/dejarDeSeguir`, options).subscribe(
      response => {
        console.log(response);
        this.usuario.seguido = false;
        return response;
      },
      error => {
        console.error(error);
        return error;
      }
    )
  }

}
