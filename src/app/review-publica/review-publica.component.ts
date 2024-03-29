import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-review-publica',
  templateUrl: './review-publica.component.html',
  styleUrls: ['./review-publica.component.css']
})
export class ReviewPublicaComponent implements OnInit {
  id = '';
  username = '';
  resena: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.username = params['username'];

      this.getResenaPublica(this.username, this.id).subscribe((res: any) => {
        this.resena = res;
      });
    });
  }

  getResenaPublica(usuario: string, idPelicula: string) {
    return this.http.get(`http://localhost:8080/api/reviewed/${usuario}/${idPelicula}`)
  }

  getEstrellas(calificacion: number) {
    let estrellas = '';
    for (let i = 0; i < calificacion; i++) {
      estrellas += '⭐';
    }
    return estrellas;
  }

}
