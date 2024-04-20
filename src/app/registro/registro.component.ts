import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  nombre = '';
  pword = '';
  pword2 = '';
  noCoinciden = false;
  existe = false;

  constructor(private authService: AuthService, private http: HttpClient) {}

  onSubmit(): void {
    if (this.pword !== this.pword2) {
      this.noCoinciden = true;
      console.log('Las contraseñas no coinciden');
      return;
    } else {
      this.authService.register(this.nombre, this.pword).subscribe(
        (success) => console.log('Registration Success'),
        (error) => console.log('Registration Error', error.error)
      );
    }
  }

  checkPwords() {
    if (this.pword === this.pword2) {
      return true;
    } else {
      return false;
    }
  }

  checkUsername() {
    this.http.get(`http://localhost:8080/usuario/${this.nombre}`).subscribe(
      (res) => {
        this.existe = true;
      },
      (error) => {
        this.existe = false;
      }
    );
  }
}
