import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'config';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-ajustes-cambiar-pword',
  templateUrl: './ajustes-cambiar-pword.component.html',
  styleUrl: './ajustes-cambiar-pword.component.css',
  animations: [
    trigger('fade', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [animate('300ms ease-in')]),
      transition('visible => hidden', [animate('300ms ease-out')]),
    ]),
  ],
})
export class AjustesCambiarPwordComponent implements OnInit {
  @Input() usuario: any;
  @Input() idPeli = '';
  pword = '';
  pword2 = '';
  apiUrl = CONFIG.apiUrl;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  pwordForm!: UntypedFormGroup;
  exito = false;
  hayError = false;
  mensaje = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private fb: UntypedFormBuilder
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }
  ngOnInit(): void {
    this.pwordForm = this.fb.group({
      pword: ['', [Validators.required]],
      pword2: ['', [Validators.required]],
    });
  }

  setNewPword() {
    if (this.pwordForm.invalid) {
      return;
    }

    this.http
      .put(
        `${this.apiUrl}/usuario/cambiarPword`,
        {},
        {
          params: {
            nombre: this.usuario.nombre,
            pword: this.pwordForm.value.pword,
            pword2: this.pwordForm.value.pword2,
          },
        }
      )
      .subscribe(
        (success) => {
          this.avisarExito();
          this.pwordForm.reset();
        },
        (error) => {
          this.avisarError();
        }
      );
  }

  avisarExito() {
    this.hayError = false;
    this.exito = true;
    this.mensaje = true;
    setTimeout(() => {
      this.mensaje = false;
    }, 5000);
    // Se crean dos setTimeouts para evitar que "exito" sea false antes de que desaparezca el mensaje
    setTimeout(() => {
      this.exito = false;
    }, 6000);
  }

  avisarError() {
    this.exito = false;
    this.hayError = true;
    this.mensaje = true;
    setTimeout(() => {
      this.mensaje = false;
    }, 5000);
    // Se crean dos setTimeouts para evitar que "hayError" sea false antes de que desaparezca el mensaje
    setTimeout(() => {
      this.hayError = false;
    }, 6000);
  }
}
