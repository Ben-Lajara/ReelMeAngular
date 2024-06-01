import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger('100ms', [animate('500ms', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  username = '';
  datos: any;
  isLoading = false;
  apiUrl = 'http://localhost:8080/api';
  actividadReciente: any;
  resenasUsuario: any;
  diario: any;
  fadeInDone = false;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fadeInDone = false;
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      console.log(this.username);
      this.isLoading = true;
      this.getUserData().subscribe((res: any) => {
        this.datos = res;
        console.log(this.datos);
        this.loadAdditionalData();
      });
    });
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/about/${this.username}`);
  }

  loadAdditionalData(): void {
    forkJoin({
      actividadReciente: this.getActividadReciente(this.username),
      resenasUsuario: this.getResenasUsuario(this.username),
      diario: this.getDiarioUsuario(this.username),
    }).subscribe(({ actividadReciente, resenasUsuario, diario }) => {
      this.actividadReciente = actividadReciente;
      this.resenasUsuario = resenasUsuario;
      this.diario = diario;
      this.isLoading = false;
    });
  }

  getActividadReciente(usuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviewed/lastactivity/${usuario}`);
  }

  getDiarioUsuario(usuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/diario/${usuario}`);
  }

  getResenasUsuario(usuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${usuario}/reviewed`);
  }

  getColor(rango: string): string {
    switch (rango) {
      case 'BRONCE':
        return '#cd7f32';
      case 'PLATA':
        return '#c0c0c0';
      case 'ORO':
        return '#ffd700';
      default:
        return '#000000';
    }
  }

  onFadeInDone() {
    this.fadeInDone = true;
  }
}
