import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReelMeService {
  urlBase = 'http://www.omdbapi.com/?apikey=495d7a25';
  urlTMDB = 'https://api.themoviedb.org/3';
  pelis = new Array();
  peli: any;
  peliTMDB: any;
  constructor(private http: HttpClient) {}

  busqueda(mensaje: string) {
    this.http
      .get<Array<any>>(this.urlBase + '&s=' + mensaje)
      .subscribe((response: any) => {
        this.pelis = response.Search.filter(
          (peli: { Type: string }) => peli.Type === 'movie'
        );
      });
  }

  busquedaIdTMDB(id: string) {
    return this.http
      .get<any>(
        this.urlTMDB +
          '/movie/' +
          id +
          '?api_key=2663bd6e5dd4ea342aa1f60dd1d669f9&external_source=imdb_id'
      )
      .pipe(
        tap((response) => {
          this.peli = response;
        })
      );
  }

  serviciosTMDB(id: string) {
    return this.http
      .get<any>(
        this.urlTMDB +
          '/movie/' +
          id +
          '/watch/providers?api_key=2663bd6e5dd4ea342aa1f60dd1d669f9&external_source=imdb_id'
      )
      .pipe(
        tap((response) => {
          this.peli = response;
        })
      );
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

  peliculaTMDB() {
    return this.peliTMDB;
  }
}
