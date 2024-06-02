import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'config';

@Component({
  selector: 'app-ajustes-foto-perfil',
  templateUrl: './ajustes-foto-perfil.component.html',
  styleUrl: './ajustes-foto-perfil.component.css',
})
export class AjustesFotoPerfilComponent {
  @Input() usuario: any;
  @Input() username: any;
  fotoSeleccionada: File | null = null;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  apiUrl = CONFIG.apiUrl;
  constructor(private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }

  onUpload(): void {
    if (this.fotoSeleccionada) {
      const fd = new FormData();
      fd.append('file', this.fotoSeleccionada, this.fotoSeleccionada.name);
      fd.append('nombre', this.username);
      this.http.post(`${this.apiUrl}/usuario/upload`, fd).subscribe(
        (success) => console.log('Upload Success'),
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
    } else {
      preview.src = '#';
      preview.classList.add('d-none');
    }
  }
}
