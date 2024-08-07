import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { CONFIG } from 'config';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RegistroComponent {
  registroForm!: UntypedFormGroup;
  existe = false;
  apiUrl = CONFIG.apiUrl;
  hayError = false;
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group(
      {
        nombre: ['', [Validators.required], [this.checkUsername()]],
        email: ['', [Validators.required, Validators.email]],
        pword: ['', [Validators.required]],
        pword2: ['', [Validators.required]],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: UntypedFormGroup) {
    console.log('checkPasswords');
    const pass = group.get('pword')?.value;
    const confirmPass = group.get('pword2')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      return;
    }

    const { nombre, email, pword } = this.registroForm.value;

    this.authService.register(nombre, email, pword).subscribe(
      (success) => {
        console.log('Registration Success');
        this.authService.login(nombre, pword).subscribe(
          (success) => this.router.navigate(['/settings']),
          (error) => console.log('Login Error', error.error)
        );
      },
      (error) => console.log('Registration Error', error.error)
    );
  }

  checkUsername(): (
    control: AbstractControl
  ) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      const nombre = control.value;
      return this.http.get(`${this.apiUrl}/usuario/${nombre}`).pipe(
        map((res) => {
          return { exists: true };
        }),
        catchError((error) => {
          return of(null);
        })
      );
    };
  }
}
