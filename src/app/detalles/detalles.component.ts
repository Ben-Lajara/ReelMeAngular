import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReelMeService } from '../reel-me.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable, first, map, switchMap, tap } from 'rxjs';
import 'chart.js/auto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import { CONFIG } from 'config';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DetallesComponent implements OnInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  currentUsername = '';
  perfil = '';
  id = '';
  resenas: any[] = [];
  resenasSeguidos: any;
  resena: any;
  calificacion = 0;
  starsCache: { [key: number]: string } = {};
  gustado = false;
  vista = false;
  puntuacionMedia = '';
  apiUrl = CONFIG.apiUrl;
  imageUrl = '';
  chartOptions: any;
  frecuencias = new Map([
    [0.5, 0],
    [1, 0],
    [1.5, 0],
    [2, 0],
    [2.5, 0],
    [3, 0],
    [3.5, 0],
    [4, 0],
    [4.5, 0],
    [5, 0],
  ]);
  chart: any;
  trailerUrl: SafeResourceUrl = '';
  peli: any;
  pelicula$: Observable<any> | undefined;
  peliTMDB: any;
  peliculaTMDB$: Observable<any> | undefined;
  sagaTMDB: any;
  sagaTMDB$: Observable<any> | undefined;
  restoFranquicia = [];
  trailerTMDB$: Observable<any> | undefined;
  isLoading = true;
  servicios: any;
  idColeccionTMDB: any;
  idColeccionTMDB$: Observable<any> | undefined;
  idTMDB = '';
  constructor(
    private route: ActivatedRoute,
    private reelme: ReelMeService,
    private http: HttpClient,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.authService.currentUsername.subscribe((username) => {
      this.currentUsername = username;
    });
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.route.params.subscribe(async (params) => {
      this.id = params['id'];
      try {
        await this.loadPelicula();
        await this.loadPeliculaTMDB();
        await this.loadServiciosTMDB();
        await this.loadActividad();
        await this.loadReviews();
        await this.loadResenasSeguidos();
        console.log('pelicula$ ', this.pelicula$);
        console.log('calificacion ', this.calificacion.toString());
        this.perfil = localStorage.getItem('perfil') || '';
      } catch (error) {
        console.error('Error loading data', error);
      }
    });
  }

  async loadPelicula(): Promise<void> {
    try {
      await this.reelme.busquedaId(this.id).toPromise();
      this.peli = this.reelme.pelicula();
      await this.getTrailer(
        `${this.reelme.pelicula().Title} ${this.reelme.pelicula().Year}`
      );
      this.pelicula$ = this.reelme.busquedaId(this.id);
      await this.pelicula$?.pipe(first()).toPromise();
      //this.isLoading = false;
    } catch (error) {
      console.error('Error loading pelicula', error);
      //this.isLoading = false;
    }
  }

  async loadPeliculaTMDB(): Promise<void> {
    try {
      await this.reelme.busquedaIdTMDB(this.id).toPromise();
      this.peliTMDB = this.reelme.peliculaTMDB();
      this.peliculaTMDB$ = this.reelme.busquedaIdTMDB(this.id);
      const id = await this.reelme
        .idColeccionTMDB(this.id)
        .pipe(first())
        .toPromise();
      this.idColeccionTMDB = id;
      if (id) {
        this.sagaTMDB = await this.reelme
          .sagaTMDB(id)
          .pipe(first())
          .toPromise();
        this.sagaTMDB$ = this.reelme.sagaTMDB(this.idColeccionTMDB);
      }
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading peliculaTMDB', error);
      this.isLoading = false;
    }
  }

  async loadServiciosTMDB(): Promise<void> {
    try {
      const data = await this.reelme.serviciosTMDB(this.id).toPromise();
      if (data.results && data.results.ES) {
        this.servicios = data.results.ES;
      }
    } catch (error) {
      console.error('Error loading serviciosTMDB', error);
    }
  }

  async loadActividad(): Promise<void> {
    try {
      await this.getActividad(this.currentUsername, this.id).toPromise();
      console.log(this.vista);
    } catch (error) {
      console.error('Error loading actividad', error);
    }
  }

  async loadReviews(): Promise<void> {
    try {
      const res = await this.getReviewsPelicula().toPromise();
      this.resenas = res;
      this.calculateFrequencies();
      this.initializeChart();
      console.log(this.frecuencias);
    } catch (error) {
      console.error('Error loading reviews', error);
    }
  }

  async loadResenasSeguidos(): Promise<void> {
    try {
      const res = await this.getResenasSeguidos(
        this.currentUsername,
        this.id
      ).toPromise();
      this.resenasSeguidos = res;
      console.log(this.resenasSeguidos);
    } catch (error) {
      console.error('Error loading resenasSeguidos', error);
    }
  }

  getReviewsPelicula(): Observable<any> {
    console.log('getReviewsPelicula');
    return this.http.get(`${this.apiUrl}/reviewed/${this.id}`);
  }

  getActividad(usuario: string, id_pelicula: string): Observable<any> {
    console.log('Existente');
    return this.http
      .get(`${this.apiUrl}/review`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        params: {
          usuario: usuario,
          idPelicula: id_pelicula,
        },
      })
      .pipe(
        tap((res) => {
          this.resena = res;
          if (this.resena) {
            this.vista = true;
            this.calificacion = this.resena.calificacion;
            this.gustado = this.resena.gustado;
          }
        })
      );
  }

  getGustados() {
    return this.resenas.filter((resena) => resena.gustado === true).length;
  }

  getStars(i: number): string {
    if (this.starsCache[i] !== undefined) {
      return this.starsCache[i];
    }

    let starClass: string;
    if (i < this.calificacion) {
      console.log('Estrella llena');
      starClass = 'bi bi-star-fill'; // Estrella llena
    } else if (i - 0.5 == this.calificacion) {
      console.log('Mitad de estrella');
      starClass = 'bi bi-star-half'; // Media estrella
    } else {
      console.log('Estrella vacía');
      starClass = 'bi bi-star'; // Estrella vacía
    }

    this.starsCache[i] = starClass;
    return starClass;
  }

  getResenasSeguidos(nombre: string, idPelicula: string) {
    return this.http.get(
      `${this.apiUrl}/resenasSeguidosPor/${nombre}/${idPelicula}`
    );
  }

  calculateFrequencies() {
    let suma = 0;
    this.resenas.forEach((resena) => {
      let calificacion = Number(resena.calificacion);
      if (!isNaN(calificacion) && calificacion >= 0.5 && calificacion <= 5) {
        suma += calificacion;
        let frecuenciaActual = this.frecuencias.get(calificacion);
        if (frecuenciaActual !== undefined) {
          this.frecuencias.set(calificacion, frecuenciaActual + 1);
        }
      }
    });
    this.puntuacionMedia = (suma / this.resenas.length).toFixed(1);
  }

  initializeChart() {
    let totalResenas = this.resenas.length;
    this.chartOptions = {
      xAxis: {
        type: 'category',
        data: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: Array.from(this.frecuencias.values()),
          type: 'bar',
          barWidth: '85%', // Ancho de las barras
          barCategoryGap: '10%', // Espacio entre las barras
          itemStyle: {
            color: 'rgba(59, 89, 152, 0.8)',
            barBorderRadius: [5, 5, 0, 0], // Bordes redondeados, [arriba izquierda, arriba derecha, abajo derecha, abajo izquierda]
            emphasis: {
              color: 'rgba(119, 147, 209, 0.8)', // Color de la barra cuando se pasa el cursor sobre ella
            },
          },
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        position: function (point: any, params: any) {
          return [point[0], 'top'];
        },
        formatter: function (params: any) {
          console.log('Total reseñas: ' + totalResenas);
          let calificacion = params[0].axisValue;
          console.log('Calificación: ' + calificacion);
          let frecuencia = params[0].data;
          console.log('Frecuencia: ' + frecuencia);
          let porcentaje = Math.round((frecuencia / totalResenas) * 100);

          let calificacionStars = '';
          for (let i = 1; i <= 5; i++) {
            if (i <= calificacion) {
              calificacionStars += '★';
            } else if (i - calificacion < 1) {
              calificacionStars += '½';
            }
          }

          return `${frecuencia} usuarios (${porcentaje}%) han puntuado ${calificacionStars}`;
        },
        textStyle: {
          fontSize: 12,
        },
      },
    };
  }

  async getTrailer(nombre: string) {
    const apiKey = 'AIzaSyDGIswB-EArefbRs6cdzWa_fRjq_NXhfZI';
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${nombre} official trailer&key=${apiKey}`;
    try {
      const response = await this.http
        .get<YoutubeResponse>(searchUrl)
        .toPromise();
      const videoId = response?.items[0].id.videoId;
      this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}`
      );
    } catch (error) {
      console.error('Error fetching trailer', error);
    }
  }
}

interface YoutubeResponse {
  items: {
    id: {
      videoId: string;
    };
  }[];
}
