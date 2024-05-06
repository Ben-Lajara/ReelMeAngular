import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReelMeService } from '../reel-me.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  @Input() username: string = '';
  @Input() peli: any;
  private apiUrl = 'http://localhost:8080/api';
  constructor(
    private route: ActivatedRoute,
    private reelme: ReelMeService,
    private http: HttpClient,
    private router: Router
  ) {}
  id = '';
  fecha = new Date();
  calificacion = 0;
  comentario = '';
  gustado = false;
  resena: any;
  editado: boolean = false;
  hoverState = 0;
  hayVeto = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.username = params['username'];
      this.busquedaID();
      this.reelme.busquedaId(this.id).subscribe(() => {
        this.peli = this.reelme.pelicula();
        console.log(this.reelme.pelicula().Title);
      });

      console.log(this.fecha);

      this.getResena(this.username, this.id).subscribe(() => {
        console.log(this.editado);
        this.checkVeto();
      });
    });
  }

  busquedaID() {
    this.reelme.busquedaId(this.id);
  }

  pelicula() {
    return this.reelme.pelicula();
  }

  enviarResena(
    fecha: Date,
    calificacion: number,
    comentario: string,
    gustado: boolean,
    id_pelicula: string,
    usuario: string,
    titulo: string,
    year: string,
    foto: string
  ) {
    const body = {
      fecha,
      calificacion,
      comentario,
      gustado,
      id_pelicula,
      usuario,
      titulo,
      year,
      foto,
    };
    if (this.editado) {
      console.log('Editado');
      return this.http.put(`${this.apiUrl}/review`, body);
    } else {
      console.log('Enviado');
      console.log(body);
      return this.http.post(`${this.apiUrl}/review`, body).subscribe(
        (response) => {
          console.log(response);
          return response;
        },
        (error) => {
          console.error(error);
          return error;
        }
      );
    }
  }

  getResena(usuario: string, id_pelicula: string) {
    console.log('Existente');
    return this.http
      .get(`${this.apiUrl}/review?usuario=${usuario}&idPelicula=${id_pelicula}`)
      .pipe(
        tap((res) => {
          this.resena = res;
          if (this.resena) {
            this.fecha = this.resena.fecha;
            this.calificacion = this.resena.calificacion;
            this.comentario = this.resena.comentario;
            this.gustado = this.resena.gustado;
            this.editado = true;
          }
        }),
        catchError((error) => {
          if (error.status === 401) {
            this.router.navigate([
              '/review',
              localStorage.getItem('username'),
              this.id,
            ]);
          }
          return throwError(error);
        })
      );
  }

  onSubmit(): void {
    console.log(this.id);
    this.enviarResena(
      this.fecha,
      this.calificacion,
      this.comentario,
      this.gustado,
      this.id,
      this.username,
      this.pelicula().Title,
      this.pelicula().Year,
      this.pelicula().Poster
    );
  }

  updateHoverState(event: MouseEvent, star: number) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    this.hoverState = offsetX < rect.width / 2 ? star - 0.5 : star;
  }

  checkVeto() {
    if (
      localStorage.getItem('veto') == null ||
      localStorage.getItem('veto') == 'null'
    ) {
      this.hayVeto = false;
    } else {
      this.hayVeto = true;
    }
  }
}
