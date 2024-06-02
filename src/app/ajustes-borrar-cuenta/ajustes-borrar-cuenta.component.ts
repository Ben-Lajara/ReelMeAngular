import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CONFIG } from 'config';

@Component({
  selector: 'app-ajustes-borrar-cuenta',
  templateUrl: './ajustes-borrar-cuenta.component.html',
  styleUrl: './ajustes-borrar-cuenta.component.css',
})
export class AjustesBorrarCuentaComponent {
  @Input() username: any;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  pwordBorrar = '';
  pwordBorrar2 = '';
  apiUrl = CONFIG.apiUrl;
  constructor(private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
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
}
