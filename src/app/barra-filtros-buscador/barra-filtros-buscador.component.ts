import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-barra-filtros-buscador',
  templateUrl: './barra-filtros-buscador.component.html',
  styleUrls: ['./barra-filtros-buscador.component.css'],
})
export class BarraFiltrosBuscadorComponent implements OnInit {
  searchType = 'pelicula';
  username = '';
  constructor(private authService: AuthService) {
    this.authService.currentUsername.subscribe((username) => {
      this.username = username;
    });
  }

  ngOnInit(): void {}
}
