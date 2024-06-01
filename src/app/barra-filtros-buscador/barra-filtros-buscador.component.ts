import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-barra-filtros-buscador',
  templateUrl: './barra-filtros-buscador.component.html',
  styleUrls: ['./barra-filtros-buscador.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class BarraFiltrosBuscadorComponent implements OnInit {
  searchType = 'pelicula';
  username = '';
  isLoading = true;
  constructor(private authService: AuthService) {
    this.authService.currentUsername.subscribe((username) => {
      this.username = username;
    });
  }

  ngOnInit(): void {
    this.isLoading = false;
  }
}
