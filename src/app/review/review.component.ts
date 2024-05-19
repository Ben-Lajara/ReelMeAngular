import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReelMeService } from '../reel-me.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  animations: [
    trigger('fade', [
      state(
        'visible',
        style({
          opacity: 1,
          display: 'block',
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          display: 'none',
        })
      ),
      transition('visible => hidden', [animate('0.5s ease-out')]),
      transition('hidden => visible', [animate('0.5s ease-in')]),
    ]),
  ],
})
export class ReviewComponent implements OnInit {
  @Input() username: string = '';
  @Input() peli: any;
  cambiosGuardados = false;
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
  mostrarRevisionado: boolean = false;
  revisionado: Date | undefined;
  fechaRevisionado = new Date();
  comentarioRevisionado = '';
  revisionados: any;
  isAddingRevisionado: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.username = params['username'];
      this.busquedaID();
      this.reelme.busquedaId(this.id).subscribe(() => {
        this.peli = this.reelme.pelicula();
        console.log(this.reelme.pelicula().Title);
      });

      console.log('fecha inicial al entrar: ', this.fecha);

      this.getResena(this.username, this.id).subscribe(() => {
        console.log(this.editado);
        console.log('fecha al recuperar los datos: ', this.fecha);
        console.log('revisionados: ', this.revisionados);
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
    foto: string,
    revisionados: any,
    revisionado?: Date
  ) {
    console.log('this.fecha: ', this.fecha);
    console.log('fecha params: ', fecha);
    const body: any = {
      fecha,
      calificacion,
      comentario,
      gustado,
      id_pelicula,
      usuario,
      titulo,
      year,
      foto,
      revisionados,
    };
    if (this.editado) {
      if (revisionado) {
        body.revisionado = revisionado;
      }
      console.log('Editado');
      console.log('Fecha al actualizar: ' + fecha);
      return this.http.put(`${this.apiUrl}/review`, body).subscribe(
        (response) => {
          console.log(response);
          return response;
        },
        (error) => {
          console.error(error);
          return error;
        }
      );
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
      .get(`${this.apiUrl}/review`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
            this.fecha = this.resena.fecha;
            this.calificacion = this.resena.calificacion;
            this.comentario = this.resena.comentario;
            this.gustado = this.resena.gustado;
            this.editado = true;
            this.revisionados = this.resena.revisionados;
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
    console.log('revisionados', this.revisionados);
    this.enviarResena(
      this.fecha,
      this.calificacion,
      this.comentario,
      this.gustado,
      this.id,
      this.username,
      this.pelicula().Title,
      this.pelicula().Year,
      this.pelicula().Poster,
      this.revisionados,
      this.revisionado ?? undefined
    );
    this.cambiosGuardados = true;

    setTimeout(() => {
      this.cambiosGuardados = false; // Oculta el mensaje
    }, 3000);
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

  toggleAgregarRevisionado() {
    this.mostrarRevisionado = !this.mostrarRevisionado;
    this.isAddingRevisionado = this.mostrarRevisionado;
    if (this.isAddingRevisionado) {
      // Solo inicializa `revisionado` si el usuario decide añadir uno.
      this.revisionado = new Date(); // O la fecha que el usuario elija.
    } else {
      // Si el usuario decide no añadir un revisionado, asegúrate de que `revisionado` no tenga un valor.
      this.revisionado = undefined;
    }
  }
}
