import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-card-peli-bd',
  templateUrl: './card-peli-bd.component.html',
  styleUrls: ['./card-peli-bd.component.css'],
})
export class CardPeliBdComponent implements OnInit {
  @Input() peli: any;

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
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      console.log('Imagen cargada');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const targetWidth = 300;
      const targetHeight = 450;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      if (ctx) {
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const resizedImageUrl = canvas.toDataURL('image/jpeg');
        this.peli.foto = resizedImageUrl;
        console.log('Imagen redimensionada');
      } else {
        console.error('No se pudo obtener el contexto del canvas');
      }
    };
    img.onerror = (error) => {
      console.error('Error al cargar la imagen', error);
    };
    img.src = this.peli.foto;
  }
}
