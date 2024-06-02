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

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm!: UntypedFormGroup;
  existe = false;
  apiUrl = CONFIG.apiUrl;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private http: HttpClient
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

    this.authService.register(nombre, pword).subscribe(
      (success) => console.log('Registration Success'),
      (error) => console.log('Registration Error', error.error)
    );
  }

  checkUsername(): (
    control: AbstractControl
  ) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        // Si el campo está vacío, retorna null inmediatamente
        return of(null);
      }
      const nombre = control.value;
      return this.http.get(`${this.apiUrl}/usuario/${nombre}`).pipe(
        map((res) => {
          // Si el usuario existe, retorna un objeto de error
          return { exists: true };
        }),
        catchError((error) => {
          // Si ocurre un error (por ejemplo, el usuario no existe), retorna null
          return of(null);
        })
      );
    };
  }
}
