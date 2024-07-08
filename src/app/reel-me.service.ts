import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

/*En este servicio se manejan las llamadas a las APIs de OMDB y TMDB.
  La API de OMDB se utiliza para buscar y almacenar los datos de las películas, ya que solo muestra los datos en inglés.
  Por otro lado, se hace uso de la API de TMDB para el apartado de detalles de la película puesto que ofrece mayor variedad
  de datos y los proporciona en diversos idiomas.
*/
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
  idColTMDB: any;
  colTMDB: any;
  constructor(private http: HttpClient) {}

  //Método para buscar películas por nombre en la API de OMDB. Se usa en la búsqueda de películas.
  busqueda(mensaje: string) {
    this.http
      .get<Array<any>>(this.urlBase + '&s=' + mensaje)
      .subscribe((response: any) => {
        // Filtra los resultados por categoría 'movie'.
        const peliculas = response.Search
          ? response.Search.filter(
              (peli: { Type: string }) => peli.Type === 'movie'
            )
          : [];

        // Asigna las películas filtradas o 'undefined' si no se encuentra ninguna.
        this.pelis = peliculas.length > 0 ? peliculas : undefined;
      });
  }

  //Busca por id específico en la API de OMDB. Se utiliza para los detalles y la reseña.
  busquedaId(id: string) {
    return this.http.get<any>(this.urlBase + '&i=' + id).pipe(
      tap((response) => {
        this.peli = response;
      })
    );
  }

  //Método para aplicar el idioma a la llamada de la API de TMDB.
  getTmdbLanguage() {
    return localStorage.getItem('tmdbLanguage') || 'en-US';
  }

  //Busca por id específico en la API de TMDB. Se utiliza para los detalles de la película.
  busquedaIdTMDB(id: string) {
    return this.http
      .get<any>(
        //Para simplificar y tener uniformidad en el código, se usa la ID de IMDB con el parámetro 'external_source=imdb_id'
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

  //Este método muestra los servicios de streaming donde se encuentra disponible la película en el territorio especificado.
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

  //Obtiene la ID de la colección a la que pertenece la película, si pertenece a alguna.
  idColeccionTMDB(id: string) {
    return this.http
      .get<any>(
        this.urlTMDB +
          '/movie/' +
          id +
          `?api_key=2663bd6e5dd4ea342aa1f60dd1d669f9&language=${this.getTmdbLanguage()}&external_source=imdb_id`
      )
      .pipe(
        tap((response) => {
          this.idColTMDB = response.belongs_to_collection
            ? response.belongs_to_collection.id
            : null;
        }),
        map((response) =>
          response.belongs_to_collection
            ? response.belongs_to_collection.id
            : null
        )
      );
  }

  //Mediante el id de la colección devuelve toda la franquicia/saga a la que pertenece la película.
  sagaTMDB(id: string) {
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/collection/${id}?api_key=2663bd6e5dd4ea342aa1f60dd1d669f9`
      )
      .pipe(
        map((response) =>
          response.parts.filter(
            (peli: { release_date: null }) => peli.release_date !== ''
          )
        )
      );
  }

  //Este método no se usa actualmente, pero se le puede dar uso en caso de fallo de la API de Google.
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

  idColeccion() {
    return this.idColTMDB;
  }

  coleccionTMDB() {
    return this.colTMDB;
  }
}
