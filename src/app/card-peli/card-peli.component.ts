import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-card-peli',
  templateUrl: './card-peli.component.html',
  styleUrls: ['./card-peli.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CardPeliComponent implements OnInit {
  @Input() mostrar: boolean = true;
  @Input() peli: any;
  isLoading = true;
  placeholder = false;

  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }

  ngOnInit(): void {
    this.isLoading = true;
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
        this.peli.Poster = resizedImageUrl;
      } else {
        console.error('No se pudo obtener el contexto del canvas');
      }
      this.isLoading = false;
    };
    img.onerror = (error) => {
      console.error('Error al cargar la imagen', error);
      img.src = '../../assets/images/No-Image-Placeholder.svg';
      this.isLoading = false;
    };
    img.src = this.peli.Poster;
  }
}
