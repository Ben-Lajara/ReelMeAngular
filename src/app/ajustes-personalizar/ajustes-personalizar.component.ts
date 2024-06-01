import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ajustes-personalizar',
  templateUrl: './ajustes-personalizar.component.html',
  styleUrl: './ajustes-personalizar.component.css',
})
export class AjustesPersonalizarComponent {
  @Input() usuario: any;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  apiUrl = 'http://localhost:8080/api';
  constructor(private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
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
}
