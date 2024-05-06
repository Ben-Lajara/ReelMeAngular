import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css'],
})
export class PanelAdminComponent implements OnInit {
  denuncias: any;
  duracionVeto: Date = new Date();
  denunciado: string = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDenuncias().subscribe((res: any) => {
      this.denuncias = res;
    });
  }

  getDenuncias() {
    return this.http.get('http://localhost:8080/denuncias');
  }

  vetarUsuario(nombre: string, duracion: Date) {
    this.http
      .put(
        'http://localhost:8080/vetar',
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
  }

  setDuracionVeto(dias: number) {
    this.duracionVeto.setDate(this.duracionVeto.getDate() + dias);
  }

  setDuracionVetoMinutos(minutos: number) {
    this.duracionVeto.setMinutes(this.duracionVeto.getMinutes() + minutos);
  }

  rechazarDenuncia(
    denunciante: string,
    denunciado: string,
    idPelicula: string
  ) {
    this.http
      .put('http://localhost:8080/rechazarDenuncia', {
        denunciante: denunciante,
        denunciado: denunciado,
        idPelicula: idPelicula,
      })
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  aceptarDenuncia(denunciante: string, denunciado: string, idPelicula: string) {
    this.http
      .put('http://localhost:8080/aceptarDenuncia', {
        denunciante: denunciante,
        denunciado: denunciado,
        idPelicula: idPelicula,
      })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
