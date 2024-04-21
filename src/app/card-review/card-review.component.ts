import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.component.html',
  styleUrls: ['./card-review.component.css'],
})
export class CardReviewComponent implements OnInit {
  @Input() peli: any;
  @Input() review: any;
  @Input() usuarioRuta: any;

  isLoggedIn: Observable<boolean>;
  //currentUsername: Observable<string>;
  currentUsername = '';
  starsCache: { [key: number]: string } = {};

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    authService.currentUsername.subscribe((username) => {
      this.currentUsername = username;
    });
  }

  ngOnInit(): void {
    console.log(this.usuarioRuta);
    console.log(this.currentUsername);
    console.log(this.review);
    console.log(this.peli.id);
  }

  getEstrellas() {
    // Método provisional. Queda que admita decimales.
    let estrellas = '';
    for (let i = 0; i < this.review.calificacion; i++) {
      estrellas += '⭐';
    }
    return estrellas;
  }

  getStars(i: number): string {
    if (this.starsCache[i] !== undefined) {
      return this.starsCache[i];
    }

    let starClass: string;
    if (i <= this.review.calificacion) {
      //console.log('Estrella llena');
      starClass = 'bi bi-star-fill'; // Estrella llena y de color amarillo
    } else if (i - 0.5 == this.review.calificacion) {
      //console.log('Mitad de estrella');
      starClass = 'bi bi-star-half'; // Mitad de estrella y de color amarillo
    } else {
      //console.log('Estrella vacía');
      starClass = 'bi bi-star'; // Estrella vacía y de color oscuro
    }

    this.starsCache[i] = starClass;
    return starClass;
  }
}
