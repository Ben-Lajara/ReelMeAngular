import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { CONFIG } from 'config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-panel-admin-pendiente',
  templateUrl: './panel-admin-pendiente.component.html',
  styleUrl: './panel-admin-pendiente.component.css',
})
export class PanelAdminPendienteComponent {
  @Input() denunciasPendientes: any;
  @Input() idPeli = '';
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  duracionVeto: Date = new Date();
  denunciante: string = '';
  denunciado: string = '';
  idResena: string = '';
  motivo: string = '';
  apiUrl = CONFIG.apiUrl;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }

  vetarUsuario(nombre: string, duracion: Date) {
    console.log(duracion.toLocaleString('es-ES'));
    this.http
      .put(
        `${this.apiUrl}/usuario/vetar`,
        {},
        {
          params: {
            nombre: nombre,
            duracionString: duracion.toLocaleString('es-ES'),
          },
        }
      )
      .subscribe((res: any) => {
        console.log(res);
      });

    this.aceptarDenuncia(
      this.denunciante,
      this.denunciado,
      parseInt(this.idResena)
    );
  }

  setDuracionVeto(dias: number) {
    this.duracionVeto.setDate(this.duracionVeto.getDate() + dias);
  }

  setDuracionVetoMinutos(minutos: number) {
    this.duracionVeto.setMinutes(this.duracionVeto.getMinutes() + minutos);
  }

  rechazarDenuncia(denunciante: string, denunciado: string, idResena: number) {
    console.log('rechazando');
    return this.http
      .put(
        `${this.apiUrl}/rechazarDenuncia`,
        {},
        {
          params: {
            denunciante: denunciante,
            denunciado: denunciado,
            idResena: idResena,
          },
        }
      )
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  aceptarDenuncia(denunciante: string, denunciado: string, idResena: number) {
    return this.http
      .put(
        `${this.apiUrl}/aceptarDenuncia`,
        {},
        {
          params: {
            denunciante: denunciante,
            denunciado: denunciado,
            idResena: idResena,
          },
        }
      )
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
