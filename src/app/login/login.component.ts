import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre='';
  pword='';

  constructor(private authService: AuthService, private router: Router,) { }

  onSubmit(): void {
    this.authService.login(this.nombre, this.pword).subscribe(
        data => {
            if (data.status === 'success') {
                localStorage.setItem('authToken', data.token); // guarda el token de autenticación
                localStorage.setItem('username', this.nombre); // guarda el nombre de usuario
                console.log('Login Success');
                this.router.navigate(['/profile', this.nombre]);
            } else {
                console.log('Login Error', data.message);
            }
        },
        error => console.log('Login Error', error.error)
    );
}
}
