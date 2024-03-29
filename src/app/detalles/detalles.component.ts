import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReelMeService } from '../reel-me.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private reelme: ReelMeService, private http: HttpClient) {}

  id = '';
  resenas: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.busquedaID();
      this.getReviewsPelicula().subscribe((res: any) => {
        console.log(res)
        this.resenas = res;
        console.log(this.resenas);
      } );
    });
  }

  busquedaID() {
    this.reelme.busquedaId(this.id);
  }

  pelicula() {
    return this.reelme.pelicula();
  }

  getReviewsPelicula(){
    console.log('getReviewsPelicula');
    return this.http.get(`http://localhost:8080/api/reviewed/${this.id}`);
  }

  getEstrellas(calificacion: number) {
    // Método temporal, las estrellas se personalizarán más adelante y permitirán decimales.
    let estrellas = '';
    for (let i = 0; i < calificacion; i++) {
      estrellas += '⭐';
    }
    return estrellas;
  }

}
