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
  trailerUrl: any;
  constructor(private http: HttpClient) {}

  getTmdbLanguage() {
    return localStorage.getItem('tmdbLanguage') || 'en-US';
  }

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
          `?api_key=2663bd6e5dd4ea342aa1f60dd1d669f9&language=${this.getTmdbLanguage()}&external_source=imdb_id`
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
          `/watch/providers?api_key=2663bd6e5dd4ea342aa1f60dd1d669f9&language=${this.getTmdbLanguage()}&external_source=imdb_id`
      )
      .pipe(
        tap((response) => {
          this.peli = response;
        })
      );
  }

  sagaTMDB(id: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/collection/${id}?api_key=2663bd6e5dd4ea342aa1f60dd1d669f9&external_source=imdb_id`
    );
  }

  trailerTMDB(id: string) {
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=2663bd6e5dd4ea342aa1f60dd1d669f9&language=en-US&external_source=imdb_id`
      )
      .pipe(
        tap((response) => {
          this.trailerUrl = response.results[0].key;
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

  trailerUrlTMDB() {
    return this.trailerUrl;
  }
}
