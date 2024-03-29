import { Component, OnInit } from '@angular/core';
import { ReelMeService } from '../reel-me.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  constructor(private reelme: ReelMeService) {}

  ngOnInit(): void {}

  pelis = '';
  id = '';

  busqueda() {
    this.reelme.busqueda(this.pelis);
  }

  busquedaID() {
    this.reelme.busquedaId(this.id);
  }

  peliculas() {
    return this.reelme.peliculas();
  }

  pelicula() {
    return this.reelme.pelicula();
  }

}
