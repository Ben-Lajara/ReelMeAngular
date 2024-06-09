import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'config';
import { ActualizarImgService } from '../actualizar-img.service';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-ajustes-foto-perfil',
  templateUrl: './ajustes-foto-perfil.component.html',
  styleUrl: './ajustes-foto-perfil.component.css',
})
export class AjustesFotoPerfilComponent {
  @Input() usuario: any;
  @Input() username: any;
  @Input() perfil: any;
  fotoSeleccionada: File | null = null;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  cropper: any;
  apiUrl = CONFIG.apiUrl;

  timestamp = new Date().getTime();
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private actualizarImgService: ActualizarImgService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }

  onUpload(): void {
    if (this.fotoSeleccionada) {
      const fd = new FormData();
      fd.append('file', this.fotoSeleccionada, this.fotoSeleccionada.name);
      fd.append('nombre', this.username);
      this.http.post(`${this.apiUrl}/usuario/upload`, fd).subscribe(
        (success) => {
          console.log('Upload Success');
          this.perfil = this.fotoSeleccionada?.name;
          this.timestamp = new Date().getTime();
          this.actualizarImgService.imgActualizada();
          console.log(this.actualizarImgService.imgActualizada());
        },
        (error) => console.log('Upload Error', error.error)
      );
    }
  }

  previewProfileImage(event: any) {
    const input = event.target;
    const preview = document.getElementById(
      'previewFotoPerfil'
    ) as HTMLImageElement;

    if (input && input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          preview.src = e.target.result as string;
          preview.classList.remove('d-none');
        }
      };
      reader.readAsDataURL(input.files[0]);
      this.fotoSeleccionada = input.files[0]; // Guarda la imagen seleccionada
    } else {
      preview.src = '#';
      preview.classList.add('d-none');
    }
  }
}
