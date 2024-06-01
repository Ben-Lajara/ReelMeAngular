import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detalles-reviewed-seguido',
  templateUrl: './detalles-reviewed-seguido.component.html',
  styleUrl: './detalles-reviewed-seguido.component.css',
})
export class DetallesReviewedSeguidoComponent {
  @Input() resena: any;
  @Input() idPeli = '';

  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }
}
