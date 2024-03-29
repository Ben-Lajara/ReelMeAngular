import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  username = '';
  seguidos: any[] = [];
  peliculas: {[key: string]: any} = {};
  ids: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.username = params['username'];
      this.seguidos = await this.getSeguidos(this.username);
      console.log(this.seguidos);
    });
  }

  async getSeguidos(nombre: string): Promise<any> {
    const response = await this.http.get(`http://localhost:8080/seguidos/${nombre}`).toPromise();
    //await this.getPeliculas();
    return response;
  }

  async getLastReview(nombre: string): Promise<any> {
    const response = await this.http.post('http://localhost/connection.php', {nombre, action: 'getLastReview'}).toPromise();
    return response;
  }

  getEstrellas(calificacion: number) {
    let estrellas = '';
    for (let i = 0; i < calificacion; i++) {
      estrellas += '⭐';
    }
    return estrellas;
  }

}
