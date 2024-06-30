import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalles-stats',
  templateUrl: './detalles-stats.component.html',
  styleUrl: './detalles-stats.component.css',
})
export class DetallesStatsComponent {
  @Input() resenas: any;
  @Input() gustados: any;
  @Input() taquilla: any;
}
