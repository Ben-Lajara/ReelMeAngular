import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CONFIG } from 'config';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css'],
})
export class RestablecerComponent implements OnInit {
  restablecerForm!: UntypedFormGroup;
  apiUrl = CONFIG.apiUrl;
  mensajeEnviado = false;
  tiempoRestante = 3600;
  private intervalId: any;
  constructor(private http: HttpClient, private fb: UntypedFormBuilder) {
    this.restablecerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.restablecerForm.valid) {
      console.log('Enviando solicitud de restablecimiento de contraseña');
      this.enviarSolicitud().subscribe(
        (data) => {
          console.log('Solicitud enviada', data);
          this.mensajeEnviado = true;
          this.iniciarContador();
        },
        (error) => console.log('Error al enviar la solicitud', error.error)
      );
    }
  }

  enviarSolicitud() {
    return this.http.post(
      `${this.apiUrl}/usuario/restablecerPword`,
      {},
      {
        params: { email: this.restablecerForm.get('email')?.value },
      }
    );
  }

  iniciarContador() {
    this.intervalId = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante === 0) {
        clearInterval(this.intervalId);
        this.mensajeEnviado = false;
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get tiempoFormateado(): string {
    const horas = Math.floor(this.tiempoRestante / 3600);
    const minutos = Math.floor((this.tiempoRestante % 3600) / 60);
    const segundos = Math.floor(this.tiempoRestante % 60);
    return `${horas}:${minutos < 10 ? '0' : ''}${minutos}:${
      segundos < 10 ? '0' : ''
    }${segundos}`;
  }
}
