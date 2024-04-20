import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  nombre = '';
  pword = '';
  restablecer = false;
  error = false;
  @ViewChild('closebutton') closebutton: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    this.authService.login(this.nombre, this.pword).subscribe(
      (data) => {
        if (data.status === 'success') {
          localStorage.setItem('authToken', data.token); // guarda el token de autenticación
          localStorage.setItem('username', data.usuario.nombre); // guarda el nombre de usuario
          this.nombre = data.usuario.nombre;
          console.log('Login Success');
          this.router.navigate(['/profile', this.nombre]);
        } else {
          this.error = true;
          console.log('Login Error', data.message);
        }
      },
      (error) => {
        this.error = true;
        console.log('Login Error', error.error);
      }
    );
    //this.closebutton.nativeElement.click();
  }
}
