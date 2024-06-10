import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CONFIG } from 'config';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AjustesComponent implements OnInit {
  fotoSeleccionada: File | null = null;
  username = '';
  usuario: any;
  pword = '';
  pword2 = '';
  pwordBorrar = '';
  pwordBorrar2 = '';
  exito = '';
  numResenas = 0;
  isLoading = true;
  apiUrl = CONFIG.apiUrl;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authService.currentUsername.subscribe((username) => {
      this.username = username;
    });
  }

  ngOnInit(): void {
    this.getUsuario();
    this.getNumResenas();
  }

  getUsuario() {
    this.http
      .get(`${this.apiUrl}/usuario/${this.username}`)
      .subscribe((res: any) => {
        this.usuario = res;
      });
  }

  getNumResenas() {
    this.http
      .get(`${this.apiUrl}/usuario/numResenas/${this.username}`)
      .subscribe((res: any) => {
        this.numResenas = res;
        this.isLoading = false;
      });
  }
}
