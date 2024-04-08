import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  username='';
  datos: any;
  isLoading = false;
  actividadReciente: any[] = [];
  resenasUsuario: any
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      console.log(this.username)
      this.isLoading = true;
      this.getUserData().subscribe((res: any) => {
        this.datos = res;
        this.isLoading = false;
        this.getActividadReciente(this.username).subscribe((res: any) => {
          this.actividadReciente = res;
        });
        this.getResenasUsuario(this.username).subscribe((res: any) => {
          this.resenasUsuario = res;
        })
      });
      
    });
  }

  getUserData() {
    return this.http.get(`http://localhost:8080/about/${this.username}`)
  }

  getActividadReciente(usuario: string){
    return this.http.get(`http://localhost:8080/api/lastactivity/${usuario}`)	

  }

  getResenasUsuario(usuario: string){
    return this.http.get(`http://localhost:8080/api/diario/${usuario}`)
  }
}
