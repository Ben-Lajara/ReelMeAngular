import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CONFIG } from 'config';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css'],
})
export class RestablecerComponent implements OnInit {
  email = '';
  apiUrl = CONFIG.apiUrl;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Enviando solicitud de restablecimiento de contraseña');
    this.enviarSolicitud().subscribe(
      (data) => {
        console.log('Solicitud enviada', data);
      },
      (error) => console.log('Error al enviar la solicitud', error.error)
    );
  }

  enviarSolicitud() {
    return this.http.post(
      `${this.apiUrl}/usuario/restablecerPword`,
      {},
      {
        params: { email: this.email },
      }
    );
  }
}
