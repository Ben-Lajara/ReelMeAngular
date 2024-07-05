import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReelMeService } from '../reel-me.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, first, tap, throwError } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CONFIG } from 'config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fade', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [animate('300ms ease-in')]),
      transition('visible => hidden', [animate('300ms ease-out')]),
    ]),
  ],
})
export class ReviewComponent implements OnInit {
  @Input() username: string = '';
  @Input() peli: any;
  cambiosGuardados = false;
  private apiUrl = CONFIG.apiUrl;
  isLoading = true;
  pelicula$: Observable<any> | undefined;
  existente = false;
  hoy = new Date();

  constructor(
    private route: ActivatedRoute,
    private reelme: ReelMeService,
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) {}

  id = '';
  fecha = new Date();
  calificacion = 0;
  comentario = '';
  gustado = false;
  spoiler = false;
  resena: any;
  editado: boolean = false;
  hoverState = 0;
  hayVeto = false;
  revisionados: any[] = [];
  revisionadosNuevos: any[] = [];
  mostrarRevisionado: boolean = false;
  mensajeError: string = '';

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.username = params['username'];
      this.busquedaID();

      this.reelme.busquedaId(this.id).subscribe(() => {
        this.peli = this.reelme.pelicula();
        this.pelicula$ = this.reelme.busquedaId(this.id);
        this.pelicula$?.pipe(first()).subscribe(() => {
          this.isLoading = false;
        });
      });

      this.getResena(this.username, this.id).subscribe(() => {
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
    spoiler: boolean,
    id_pelicula: string,
    usuario: string,
    titulo: string,
    year: string,
    foto: string,
    revisionados: any[],
    revisionadosNuevos: any[]
  ) {
    const body: any = {
      fecha,
      calificacion,
      comentario,
      gustado,
      spoiler,
      id_pelicula,
      usuario,
      titulo,
      year,
      foto,
      revisionados,
      revisionadosNuevos,
    };
    if (this.editado) {
      return this.http.put(`${this.apiUrl}/review`, body).subscribe(
        (response) => {
          return response;
        },
        (error) => {
          return error;
        }
      );
    } else {
      console.log(body);
      return this.http.post(`${this.apiUrl}/review`, body).subscribe(
        (response) => {
          return response;
        },
        (error) => {
          return error;
        }
      );
    }
  }

  getResena(usuario: string, id_pelicula: string) {
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
            this.fecha = this.resena.fecha;
            this.calificacion = this.resena.calificacion;
            this.comentario = this.resena.comentario;
            this.gustado = this.resena.gustado;
            this.spoiler = this.resena.spoiler;
            this.editado = true;
            this.revisionados = this.resena.revisionados || [];
            this.existente = true;
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
      this.spoiler,
      this.id,
      this.username,
      this.pelicula().Title,
      this.pelicula().Year,
      this.pelicula().Poster,
      this.revisionados,
      this.revisionadosNuevos
    );
    this.avisarCambiosGuardados();
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

  agregarRevisionadoNuevo() {
    this.revisionadosNuevos.push({
      fechaRevisionado: new Date(),
      comentarioRevisionado: '',
    });
  }

  eliminarRevisionadoNuevo(i: number) {
    this.revisionadosNuevos.splice(i, 1);
  }

  confirmarEliminacion(i: number, id: number) {
    this.translate
      .get('reviewConfirmarEliminacionRevisionado')
      .subscribe((mensaje: string) => {
        if (confirm(mensaje)) {
          this.eliminarRevisionado(i, id);
        }
      });
  }

  eliminarRevisionado(i: number, id: number) {
    this.revisionados.splice(i, 1);
    console.log(this.revisionados);
    console.log('id: ', id);
    this.http
      .delete(`${this.apiUrl}/revisionado`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        params: {
          id: id.toString(),
        },
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  eliminarReview(nombreUsuario: string, idPelicula: string) {
    this.translate
      .get('reviewConfirmarEliminacion')
      .subscribe((mensaje: string) => {
        if (confirm(mensaje)) {
          this.http
            .delete(`${this.apiUrl}/review`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              params: {
                usuario: nombreUsuario,
                idPelicula: idPelicula,
              },
            })
            .subscribe(
              (response) => {
                console.log(response);
                this.router.navigate(['/about', nombreUsuario]);
              },
              (error) => {
                console.error(error);
              }
            );
        }
      });
  }

  avisarCambiosGuardados() {
    this.cambiosGuardados = true;
    setTimeout(() => {
      this.cambiosGuardados = false;
    }, 3000);
  }
}
