import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'config';

@Component({
  selector: 'app-ajustes-cambiar-pword',
  templateUrl: './ajustes-cambiar-pword.component.html',
  styleUrl: './ajustes-cambiar-pword.component.css',
})
export class AjustesCambiarPwordComponent {
  @Input() usuario: any;
  @Input() idPeli = '';
  exito = '';
  pword = '';
  pword2 = '';
  apiUrl = CONFIG.apiUrl;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
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
}
