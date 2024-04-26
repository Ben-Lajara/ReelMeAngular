import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css'],
})
export class AjustesComponent implements OnInit {
  fotoSeleccionada: File | null = null;
  username = '';
  usuario: any;
  pword = '';
  pword2 = '';
  exito = '';
  numResenas = 0;

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
    this.route.params.subscribe((params) => {
      //this.username = params['username'];
      this.getUsuario().subscribe((res: any) => {
        this.usuario = res;
        console.log(this.usuario);
        this.getNumResenas().subscribe((res: any) => {
          this.numResenas = res;
        });
      });
    });
  }

  getUsuario() {
    return this.http.get(`http://localhost:8080/usuario/${this.username}`);
  }

  setNewPword() {
    if (this.pword !== this.usuario.pword) {
      console.log('Contraseña incorrecta');
    } else {
      this.usuario.pword = this.pword2;
      this.http
        .put(`http://localhost:8080/cambiarPword`, this.usuario)
        .subscribe(
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
      this.http.post('http://localhost:8080/upload', fd).subscribe(
        (success) => console.log('Upload Success'),
        (error) => console.log('Upload Error', error.error)
      );
    }
  }

  getNumResenas() {
    return this.http.get(`http://localhost:8080/numResenas/${this.username}`);
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

    this.http.put(`http://localhost:8080/color`, this.usuario).subscribe(
      (success) => {
        console.log('Color Updated');
      },
      (error) => console.log('Color Update Error', error.error)
    );
  }

  updateBio() {
    this.http.put(`http://localhost:8080/bio`, this.usuario).subscribe(
      (success) => {
        console.log('Bio Updated');
      },
      (error) => console.log('Bio Update Error', error.error)
    );
  }
}
