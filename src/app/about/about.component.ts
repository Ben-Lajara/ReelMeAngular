import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  username = '';
  datos: any;
  isLoading = false;
  actividadReciente: any[] = [];
  resenasUsuario: any;
  apiUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      console.log(this.username);
      this.isLoading = true;
      this.getUserData().subscribe((res: any) => {
        this.datos = res;
        console.log(this.datos);
        this.isLoading = false;
        this.getActividadReciente(this.username).subscribe((res: any) => {
          this.actividadReciente = res;
          console.log(this.actividadReciente);
        });
        this.getResenasUsuario(this.username).subscribe((res: any) => {
          this.resenasUsuario = res;
        });
      });
    });
  }

  getUserData() {
    return this.http.get(`${this.apiUrl}/usuario/about/${this.username}`);
  }

  getActividadReciente(usuario: string) {
    return this.http.get(`${this.apiUrl}/reviewed/lastactivity/${usuario}`);
  }

  getResenasUsuario(usuario: string) {
    return this.http.get(`${this.apiUrl}/diario/${usuario}`);
  }

  getColor(rango: string) {
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
}
