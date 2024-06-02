import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CONFIG } from 'config';

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
    this.getDenuncias().subscribe((res: any) => {
      this.denuncias = res;
      this.getDenunciasPendientes().subscribe((res: any) => {
        this.denunciasPendientes = res;
      });
      this.getDenunciasAceptadas().subscribe((res: any) => {
        this.denunciasAceptadas = res;
      });
      this.getDenunciasRechazadas().subscribe((res: any) => {
        this.denunciasRechazadas = res;
        this.isLoading = false;
      });
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
