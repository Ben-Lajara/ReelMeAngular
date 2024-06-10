import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { CONFIG } from 'config';

@Component({
  selector: 'app-review-publica',
  templateUrl: './review-publica.component.html',
  styleUrls: ['./review-publica.component.css'],
})
export class ReviewPublicaComponent implements OnInit {
  id = '';
  username = '';
  usuarioActual = '';
  resena: any;
  mostrarDenuncia = false;
  motivo = '';
  denunciaEnviada = false;
  denunciaExistente: any;
  mostrarSpoiler = false;
  apiUrl = CONFIG.apiUrl;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.username = params['username'];
      this.usuarioActual = localStorage.getItem('username') || '';
      this.getResenaPublica(this.username, this.id).subscribe((res: any) => {
        this.resena = res;
        console.log(this.resena);
        this.getDenuncia().subscribe((res: any) => {
          this.denunciaExistente = res;
        });
        console.log(this.denunciaExistente);
      });
    });
  }

  getResenaPublica(usuario: string, idPelicula: string) {
    return this.http.get(`${this.apiUrl}/reviewed/${usuario}/${idPelicula}`);
  }

  denunciar(
    denunciante: string,
    denunciado: string,
    idPelicula: string,
    motivo: string
  ) {
    console.log(denunciante, denunciado, idPelicula, motivo);
    this.denunciaEnviada = true;
    return this.http
      .post(
        `${this.apiUrl}/denuncias/denunciar`,
        {},
        {
          params: {
            denunciante: denunciante,
            denunciado: denunciado,
            idPelicula: idPelicula,
            motivo: motivo,
          },
        }
      )
      .subscribe((res: any) => {
        this.denunciaExistente = true;
      });
  }

  getDenuncia() {
    return this.http.get(`${this.apiUrl}/denuncias/existente`, {
      params: {
        denunciante: this.usuarioActual,
        denunciado: this.username,
        idPelicula: this.id,
      },
    });
  }
}
