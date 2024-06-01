import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReelMeService {
  urlBase = 'http://www.omdbapi.com/?apikey=495d7a25';
  pelis = new Array();
  peli: any;
  constructor(private http: HttpClient) {}

  busqueda(mensaje: string) {
    this.http
      .get<Array<any>>(this.urlBase + '&s=' + mensaje)
      .subscribe((response: any) => {
        this.pelis = response.Search;
      });
  }

  busquedaId(id: string) {
    return this.http.get<any>(this.urlBase + '&i=' + id).pipe(
      tap((response) => {
        this.peli = response;
      })
    );
  }

  peliculas() {
    return this.pelis;
  }

  pelicula() {
    return this.peli;
  }
}
