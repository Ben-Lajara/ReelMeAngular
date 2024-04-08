import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-filtros-buscador',
  templateUrl: './barra-filtros-buscador.component.html',
  styleUrls: ['./barra-filtros-buscador.component.css']
})
export class BarraFiltrosBuscadorComponent implements OnInit {
  searchType = 'pelicula'
  constructor() { }

  ngOnInit(): void {
  }

}
