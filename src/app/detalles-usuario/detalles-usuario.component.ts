import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalles-usuario',
  templateUrl: './detalles-usuario.component.html',
  styleUrl: './detalles-usuario.component.css',
})
export class DetallesUsuarioComponent {
  @Input() currentUsername: any;
  @Input() perfil: any;
  @Input() calificacion: any;
  @Input() idPelicula: any;
}
