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

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      //this.username = params['username'];
      this.seguidos = await this.getSeguidos(this.username);
      console.log(this.seguidos);
    });
  }

  async getSeguidos(nombre: string): Promise<any> {
    const response = await this.http
      .get(`http://localhost:8080/seguidos/${nombre}`)
      .toPromise();
    //await this.getPeliculas();
    return response;
  }

  async getLastReview(nombre: string): Promise<any> {
    const response = await this.http
      .post('http://localhost/connection.php', {
        nombre,
        action: 'getLastReview',
      })
      .toPromise();
    return response;
  }
}
