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
      state('visible', style({ opacity: 1, display: 'block' })),
      state('hidden', style({ opacity: 0, display: 'none' })),
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
  revisionados: any[] = [];
  revisionadosNuevos: any[] = [];
  mostrarRevisionado: boolean = false;
  mensajeError: string = '';

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
    revisionados: any[],
    revisionadosNuevos: any[]
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
      revisionadosNuevos,
    };
    if (this.editado) {
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
            this.revisionados = this.resena.revisionados || [];
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
    console.log('revisionadosNuevos', this.revisionadosNuevos);
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
      this.revisionadosNuevos
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

  puedeAgregarRevisionadoNuevo(): boolean {
    const hoy = new Date().toISOString().split('T')[0]; // Solo la fecha, sin tiempo
    if (this.revisionados.length > 0) {
      const ultimaFechaExistente = new Date(
        this.revisionados[this.revisionados.length - 1].fechaRevisionado
      )
        .toISOString()
        .split('T')[0];
      if (ultimaFechaExistente === hoy) {
        return false;
      }
    }
    if (this.revisionadosNuevos.length > 0) {
      const ultimaFechaNueva = new Date(
        this.revisionadosNuevos[
          this.revisionadosNuevos.length - 1
        ].fechaRevisionado
      )
        .toISOString()
        .split('T')[0];
      if (ultimaFechaNueva === hoy) {
        return false;
      }
    }
    return true;
  }

  agregarRevisionadoNuevo() {
    if (this.puedeAgregarRevisionadoNuevo()) {
      this.revisionadosNuevos.push({
        fechaRevisionado: new Date(),
        comentarioRevisionado: '',
      });
      this.mensajeError = ''; // Limpiar el mensaje de error si se puede agregar un nuevo revisionado
    } else {
      this.mensajeError =
        'No se puede añadir un nuevo revisionado con la fecha actual.';
    }
  }

  eliminarRevisionadoNuevo(i: number) {
    this.revisionadosNuevos.splice(i, 1);
  }

  confirmarEliminacion(i: number, id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      this.eliminarRevisionado(i, id);
    }
  }

  eliminarRevisionado(i: number, id: number) {
    this.revisionados.splice(i, 1);
    console.log(this.revisionados);
    console.log('id: ', id);
    this.http
      .delete(`${this.apiUrl}/revisionado`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
}
