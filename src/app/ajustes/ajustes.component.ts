import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AjustesComponent implements OnInit {
  fotoSeleccionada: File | null = null;
  username = '';
  usuario: any;
  pword = '';
  pword2 = '';
  pwordBorrar = '';
  pwordBorrar2 = '';
  exito = '';
  numResenas = 0;
  isLoading = true;
  apiUrl = 'http://localhost:8080/api';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authService.currentUsername.subscribe((username) => {
      this.username = username;
    });
  }

  ngOnInit(): void {
    this.getUsuario();
    this.getNumResenas();
  }

  getUsuario() {
    this.http
      .get(`${this.apiUrl}/usuario/${this.username}`)
      .subscribe((res: any) => {
        this.usuario = res;
      });
  }

  setNewPword() {
    if (this.pword !== this.usuario.pword) {
      console.log('Contraseña incorrecta');
    } else {
      this.usuario.pword = this.pword2;
      this.http.put(`${this.apiUrl}/cambiarPword`, this.usuario).subscribe(
        (success) => {
          console.log('Password Updated');
          this.exito = 'Contraseña Actualizada';
          this.pword = '';
          this.pword2 = '';
        },
        (error) => console.log('Password Update Error', error.error)
      );
    }
  }

  onFileSelected(event: any): void {
    this.fotoSeleccionada = event.target.files[0];
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

  getNumResenas() {
    this.http
      .get(`${this.apiUrl}/usuario/numResenas/${this.username}`)
      .subscribe((res: any) => {
        this.numResenas = res;
        this.isLoading = false;
      });
  }

  getProgreso() {
    switch (this.usuario.rango) {
      case 'BRONCE':
        return ((this.numResenas - 10) / 15) * 100;
      case 'PLATA':
        return ((this.numResenas - 25) / 25) * 100;
      case 'ORO':
        return 100;
      default:
        return (this.numResenas / 10) * 100;
    }
  }

  getRangoActual() {
    switch (this.usuario.rango) {
      case 'BRONCE':
        return 10;
      case 'PLATA':
        return 25;
      default:
        return 0;
    }
  }

  getTotalToNextRank() {
    switch (this.usuario.rango) {
      case 'BRONCE':
        return 15;
      case 'PLATA':
        return 25;
      case 'ORO':
        return 0;
      default:
        return 10;
    }
  }

  setColor(color: string) {
    if (color != '') {
      this.usuario.color = color;
    } else {
      this.usuario.color = null;
    }

    this.http.put(`${this.apiUrl}/usuario/color`, this.usuario).subscribe(
      (success) => {
        console.log('Color Updated');
      },
      (error) => console.log('Color Update Error', error.error)
    );
  }

  updateBio() {
    this.http.put(`${this.apiUrl}/usuario/bio`, this.usuario).subscribe(
      (success) => {
        console.log('Bio Updated');
      },
      (error) => console.log('Bio Update Error', error.error)
    );
  }

  deleteUser() {
    console.log('Eliminando usuario');
    const params = new HttpParams()
      .set('pword', this.pwordBorrar)
      .set('nombre', this.username);
    this.http.delete(`${this.apiUrl}/usuario/delete`, { params }).subscribe(
      (success) => {
        console.log('Usuario Eliminado');
        this.authService.logout();
      },
      (error) => console.log('Error al eliminar usuario', error.error)
    );
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
