import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CONFIG } from 'config';
import { forkJoin } from 'rxjs';

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
  username = '';
  usuario: any;
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
    forkJoin({
      usuario: this.http.get(`${this.apiUrl}/usuario/${this.username}`),
      numResenas: this.http.get(
        `${this.apiUrl}/usuario/numResenas/${this.username}`
      ),
    }).subscribe(({ usuario, numResenas }: any) => {
      this.usuario = usuario;
      this.numResenas = numResenas;
      this.isLoading = false;
    });
  }
}
