import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CONFIG } from 'config';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PanelAdminComponent implements OnInit {
  denuncias: any;
  denunciasPendientes: any;
  denunciasAceptadas: any;
  denunciasRechazadas: any;
  duracionVeto: Date = new Date();
  denunciante: string = '';
  denunciado: string = '';
  idResena: string = '';
  motivo: string = '';
  isLoading = true;
  apiUrl = CONFIG.apiUrl;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    forkJoin({
      denuncias: this.getDenuncias(),
      denunciasPendientes: this.getDenunciasPendientes(),
      denunciasAceptadas: this.getDenunciasAceptadas(),
      denunciasRechazadas: this.getDenunciasRechazadas(),
    }).subscribe((res: any) => {
      this.denuncias = res.denuncias;
      this.denunciasPendientes = res.denunciasPendientes;
      this.denunciasAceptadas = res.denunciasAceptadas;
      this.denunciasRechazadas = res.denunciasRechazadas;
      this.isLoading = false;
    });
  }

  getDenuncias() {
    return this.http.get(`${this.apiUrl}/denuncias`);
  }

  getDenunciasPendientes() {
    return this.http.get(`${this.apiUrl}/denuncias/pendientes`);
  }

  getDenunciasAceptadas() {
    return this.http.get(`${this.apiUrl}/denuncias/aceptadas`);
  }

  getDenunciasRechazadas() {
    return this.http.get(`${this.apiUrl}/denuncias/rechazadas`);
  }

  getResenaDenunciada(id: number) {
    return this.http.get(`${this.apiUrl}/reviewed`, {
      params: {
        id: id,
      },
    });
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
        this.actualizarDenuncias();
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
        this.actualizarDenuncias();
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
        this.actualizarDenuncias();
      });
  }

  actualizarDenuncias() {
    this.isLoading = true;
    forkJoin({
      denuncias: this.getDenuncias(),
      denunciasPendientes: this.getDenunciasPendientes(),
      denunciasAceptadas: this.getDenunciasAceptadas(),
      denunciasRechazadas: this.getDenunciasRechazadas(),
    }).subscribe((res: any) => {
      this.denuncias = res.denuncias;
      this.denunciasPendientes = res.denunciasPendientes;
      this.denunciasAceptadas = res.denunciasAceptadas;
      this.denunciasRechazadas = res.denunciasRechazadas;
      this.isLoading = false;
    });
  }
}
