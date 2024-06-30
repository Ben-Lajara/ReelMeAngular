import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalles-servicios',
  templateUrl: './detalles-servicios.component.html',
  styleUrl: './detalles-servicios.component.css',
})
export class DetallesServiciosComponent {
  @Input() servicios: any;
}
