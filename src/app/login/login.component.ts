import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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
  nombreError = '';
  pwordError = '';
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((field) => {
        const control = this.loginForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.authService.login(this.nombre, this.pword).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.nombre = response.usuario.nombre;
          this.router.navigate(['/home']);
        } else {
          if (response.error === 'User not found') {
            this.nombreError = response.error;
            console.log('Nombre error: ', this.nombreError);
            this.pwordError = '';
          } else if (response.error === 'Incorrect password') {
            this.pwordError = response.error;
            console.log('Pword error: ', this.pwordError);
            this.nombreError = '';
          }
        }
      },
      (error) => {
        if (error.error.error === 'User not found') {
          this.nombreError = error.error.error;
          console.log('Nombre error error: ', this.nombreError);
          this.pwordError = '';
        } else if (error.error.error === 'Incorrect password') {
          this.pwordError = error.error.error;
          console.log('Pword error error: ', this.pwordError);
          this.nombreError = '';
        }
      }
    );
  }
}
