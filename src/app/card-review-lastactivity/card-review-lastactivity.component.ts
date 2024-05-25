import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-card-review-lastactivity',
  templateUrl: './card-review-lastactivity.component.html',
  styleUrls: ['./card-review-lastactivity.component.css'],
})
export class CardReviewLastactivityComponent implements OnInit {
  @Input() resena: any;

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
      console.log('Imagen cargada'); // Verificación de carga
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const targetWidth = 300; // Ancho deseado
      const targetHeight = 450; // Alto deseado
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      if (ctx) {
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const resizedImageUrl = canvas.toDataURL('image/jpeg');
        this.resena.idPelicula.foto = resizedImageUrl;
        console.log('Imagen redimensionada'); // Verificación de redimensionamiento
      } else {
        console.error('No se pudo obtener el contexto del canvas');
      }
    };
    img.onerror = (error) => {
      console.error('Error al cargar la imagen', error);
    };
    img.src = this.resena.idPelicula.foto;
  }
}
