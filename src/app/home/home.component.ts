import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username = '';
  apiUrl = 'http://localhost:8080/api';
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
  seguidos: any[] = [];
  peliculas: { [key: string]: any } = {};
  ids: any[] = [];
  showAll: boolean = false;
  visibleSeguidos: any[] = [];
  top4Peliculas: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      //this.username = params['username'];
      this.seguidos = await this.getSeguidos(this.username);
      this.top4Peliculas = await this.getTop4Peliculas();
      this.updateVisibleSeguidos();
      console.log(this.seguidos);
    });
  }

  async getSeguidos(nombre: string): Promise<any> {
    const response = await this.http
      .get(`${this.apiUrl}/usuario/${nombre}/seguidos/reviewed`)
      .toPromise();
    //await this.getPeliculas();
    return response;
  }

  async getTop4Peliculas(): Promise<any> {
    const response = await this.http
      .get(`${this.apiUrl}/reviewed/top4`)
      .toPromise();
    return response;
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
}
