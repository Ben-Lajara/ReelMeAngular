import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CONFIG } from 'config';

@Component({
  selector: 'app-restablecimiento',
  templateUrl: './restablecimiento.component.html',
  styleUrls: ['./restablecimiento.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RestablecimientoComponent implements OnInit {
  token = '';
  pword1 = '';
  pword2 = '';
  usuario: any;
  exito = false;
  apiUrl = CONFIG.apiUrl;
  restablecimientoForm!: UntypedFormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.token = params['token'];
      this.getUsuario().subscribe((res) => {
        this.usuario = res;
      });
    });
    this.restablecimientoForm = this.fb.group(
      {
        pword1: ['', [Validators.required]],
        pword2: ['', [Validators.required]],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: UntypedFormGroup) {
    const pass = group.get('pword1')?.value;
    const confirmPass = group.get('pword2')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.restablecimientoForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    this.restablecerPword();
  }

  getUsuario() {
    return this.http.get(`${this.apiUrl}/usuario/tokenPword`, {
      params: { token: this.token },
    });
  }

  restablecerPword() {
    console.log(this.token);
    this.http
      .put(
        `${this.apiUrl}/usuario/resetPword`,
        {},
        {
          params: {
            nombre: this.usuario.nombre,
            pword: this.restablecimientoForm.value.pword1,
            pword2: this.restablecimientoForm.value.pword2,
            token: this.token,
          },
        }
      )
      .subscribe(
        (success) => {
          console.log('Password Updated');
          this.exito = true;
          this.router.navigate(['/login']);
        },
        (error) => console.log('Password Update Error', error.error)
      );
  }
}
