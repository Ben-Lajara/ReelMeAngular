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
import { Observable, tap } from 'rxjs';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  currentUsername = '';
  id = '';
  resenas: any[] = [];
  resenasSeguidos: any[] = [];
  resena: any;
  calificacion = 0;
  starsCache: { [key: number]: string } = {};
  gustado = false;
  vista = false;
  puntuacionMedia = '';
  frecuenciasDiccionario = {
    0.5: 0,
    1: 0,
    1.5: 0,
    2: 0,
    2.5: 0,
    3: 0,
    3.5: 0,
    4: 0,
    4.5: 0,
    5: 0,
  };
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.busquedaID();
      this.pelicula$ = this.reelme.busquedaId(this.id);

      this.reelme.busquedaId(this.id).subscribe(() => {
        this.peli = this.reelme.pelicula();
        console.log(this.reelme.pelicula().Title);
        this.getTrailer(
          this.reelme.pelicula().Title + ' ' + this.reelme.pelicula().Year
        );
      });
      this.getActividad(this.currentUsername, this.id).subscribe(() => {
        console.log(this.vista);
      });
      this.getReviewsPelicula().subscribe((res: any) => {
        console.log(res);
        this.resenas = res;
        console.log(this.resenas);
        this.puntuacionMedia = this.getPuntuacionMedia();
        console.log(this.frecuencias);
        this.getResenasSeguidos(this.currentUsername, this.id).subscribe(
          (res: any) => {
            this.resenasSeguidos = res;
            console.log(this.resenasSeguidos);
            this.crearGrafico();
          }
        );
        //this.crearGrafico();
      });
    });
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit');
    //this.crearGrafico();
  }

  busquedaID() {
    this.reelme.busquedaId(this.id);
  }

  pelicula() {
    return this.reelme.pelicula();
  }

  getReviewsPelicula() {
    console.log('getReviewsPelicula');
    return this.http.get(`http://localhost:8080/api/reviewed/${this.id}`);
  }

  getEstrellas(calificacion: number) {
    // Método temporal, las estrellas se personalizarán más adelante y permitirán decimales.
    let estrellas = '';
    for (let i = 0; i < calificacion; i++) {
      estrellas += '⭐';
    }
    return estrellas;
  }

  getGustados() {
    return this.resenas.filter((resena) => resena.gustado === true).length;
  }

  getActividad(usuario: string, id_pelicula: string) {
    console.log('Existente');
    return this.http
      .get(
        `http://localhost:8080/api/review?usuario=${usuario}&idPelicula=${id_pelicula}`
      )
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

  getPuntuacionMedia() {
    let suma = 0;
    this.resenas.forEach((resena) => {
      let calificacion = Number(resena.calificacion);
      if (!isNaN(calificacion) && calificacion >= 1 && calificacion <= 5) {
        suma += calificacion;
        let frecuenciaActual = this.frecuencias.get(calificacion);
        if (frecuenciaActual !== undefined) {
          this.frecuencias.set(calificacion, frecuenciaActual + 1);
        }
      }
    });
    return (suma / this.resenas.length).toFixed(1);
  }

  getStars(i: number): string {
    if (this.starsCache[i] !== undefined) {
      return this.starsCache[i];
    }

    let starClass: string;
    if (i < this.calificacion) {
      console.log('Estrella llena');
      starClass = 'bi bi-star-fill'; // Estrella llena y de color amarillo
    } else if (i - 0.5 == this.calificacion) {
      console.log('Mitad de estrella');
      starClass = 'bi bi-star-half'; // Mitad de estrella y de color amarillo
    } else {
      console.log('Estrella vacía');
      starClass = 'bi bi-star'; // Estrella vacía y de color oscuro
    }

    this.starsCache[i] = starClass;
    return starClass;
  }

  getResenasSeguidos(nombre: string, idPelicula: string) {
    return this.http.get(
      `http://localhost:8080/resenasSeguidosPor/${nombre}/${idPelicula}`
    );
  }

  crearGrafico() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    console.log(ctx);
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
          datasets: [
            {
              data: Array.from(this.frecuencias.values()),
              backgroundColor: ['rgb(255 255 255)'],
              borderColor: ['rgb(255 255 255)'],
              hoverBackgroundColor: ['rgb(133 133 133)'],
              hoverBorderColor: ['rgb(133 133 133)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              display: false,
              grid: {
                display: false,
              },
            },
            x: {
              ticks: {
                color: 'white',
              },
              grid: {
                display: false,
              },
            },
          },
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              callbacks: {
                label: function (context) {
                  let total = context.dataset.data.reduce(
                    (a, b) => (a as number) + (b as number),
                    0
                  ) as number;
                  let value = context.raw as number;
                  let percentage = ((value / total) * 100).toFixed(2);
                  return `${context.label}: ${value} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    } else {
      console.error('No se pudo obtener canvas');
    }
  }

  getNombrePelicula() {
    return this.pelicula().Title;
  }

  getTrailer(nombre: string) {
    //const apiKey = 'AIzaSyDGIswB-EArefbRs6cdzWa_fRjq_NXhfZI';
    const apiKey = 'AIzaSyDR-mngrtrilvHbvrvrmqmJGWnRODRPDw0';
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${nombre} official trailer&key=${apiKey}`;
    this.http.get<YoutubeResponse>(searchUrl).subscribe((response) => {
      const videoId = response.items[0].id.videoId;
      this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}`
      );
    });
  }
}

interface YoutubeResponse {
  items: {
    id: {
      videoId: string;
    };
  }[];
}
