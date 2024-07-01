import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { AuthService } from '../auth.service';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CONFIG } from 'config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {
  username = '';
  apiUrl = CONFIG.apiUrl;
  isLoading = true;
  fadeInDone = false;
  seguidos: any[] = [];
  peliculas: { [key: string]: any } = {};
  ids: any[] = [];
  showAll: boolean = false;
  visibleSeguidos: any[] = [];
  top4Peliculas: any[] = [];
  //testimonials: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.currentUsername.subscribe((username) => {
      this.username = username;
      console.log(this.username);
    });
  }

  ngOnInit(): void {
    if (this.username) {
      forkJoin({
        seguidos: this.getSeguidos(this.username),
        top4Peliculas: this.getTop4Peliculas(),
      }).subscribe(({ seguidos, top4Peliculas }) => {
        this.seguidos = seguidos;
        this.top4Peliculas = top4Peliculas;
        this.updateVisibleSeguidos();
        console.log(this.seguidos);
        this.isLoading = false;
      });
    } else {
      this.getTop4Peliculas().subscribe((top4Peliculas) => {
        this.top4Peliculas = top4Peliculas;
        this.isLoading = false;
      });
    }
  }

  getSeguidos(nombre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${nombre}/seguidos/reviewed`);
  }

  getTop4Peliculas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviewed/top4`);
  }

  updateVisibleSeguidos() {
    this.visibleSeguidos = this.showAll
      ? this.seguidos
      : this.seguidos.slice(0, 4);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.updateVisibleSeguidos();
  }

  onFadeInDone() {
    this.fadeInDone = true;
  }
}
