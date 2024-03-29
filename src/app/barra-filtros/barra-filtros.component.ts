import { Component, OnInit } from '@angular/core';
import { ParamsFiltrosService } from '../params-filtros.service';

@Component({
  selector: 'app-barra-filtros',
  templateUrl: './barra-filtros.component.html',
  styleUrls: ['./barra-filtros.component.css']
})
export class BarraFiltrosComponent implements OnInit {

  constructor(private filtros:ParamsFiltrosService) { }

  ngOnInit(): void {
  }

  setNewOrder(newOrder: string) {
    this.filtros.setNewOrden(newOrder);
  }
}
