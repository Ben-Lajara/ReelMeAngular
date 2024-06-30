import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detalles-reviewed',
  templateUrl: './detalles-reviewed.component.html',
  styleUrl: './detalles-reviewed.component.css',
})
export class DetallesReviewedComponent {
  @Input() resena: any;
  @Input() resenas: any;
  @Input() idPeli = '';
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }
}
