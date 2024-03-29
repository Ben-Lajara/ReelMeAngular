import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.component.html',
  styleUrls: ['./card-review.component.css']
})
export class CardReviewComponent implements OnInit {
  @Input() peli: any;
  @Input() review: any;
  
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }

  ngOnInit(): void {
  }

  getEstrellas() {
    // Método provisional. Queda que admita decimales.
    let estrellas = '';
    for (let i = 0; i < this.review.calificacion; i++) {
      estrellas += '⭐';
    }
    return estrellas;
  }
}
