import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-card-review-seguido',
  templateUrl: './card-review-seguido.component.html',
  styleUrls: ['./card-review-seguido.component.css'],
})
export class CardReviewSeguidoComponent implements OnInit {
  @Input() seguido: any;

  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }

  ngOnInit(): void {
    this.resizeImage();
  }

  resizeImage(): void {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Intenta evitar problemas de CORS
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const targetWidth = 300; // Ancho deseado
      const targetHeight = 450; // Alto deseado
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      if (ctx) {
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const resizedImageUrl = canvas.toDataURL('image/jpeg');
        this.seguido.idPelicula.foto = resizedImageUrl;
      } else {
        console.error('No se pudo obtener el contexto del canvas');
      }
    };
    img.onerror = (error) => {
      console.error('Error al cargar la imagen', error);
    };
    img.src = this.seguido.idPelicula.foto;
  }
}
