import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CONFIG } from 'config';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-ajustes-borrar-cuenta',
  templateUrl: './ajustes-borrar-cuenta.component.html',
  styleUrl: './ajustes-borrar-cuenta.component.css',
})
export class AjustesBorrarCuentaComponent implements OnInit {
  @Input() username: any;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  pwordBorrar = '';
  pwordBorrar2 = '';
  apiUrl = CONFIG.apiUrl;
  eliminarForm!: UntypedFormGroup;
  hayError = false;
  mensajeError = '';
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private fb: UntypedFormBuilder
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }
  ngOnInit(): void {
    this.eliminarForm = this.fb.group(
      {
        pwordBorrar: ['', [Validators.required]],
        pwordBorrar2: ['', [Validators.required]],
      },
      { validator: this.checkPasswords }
    );
  }
  checkPasswords(group: UntypedFormGroup) {
    const pass = group.get('pwordBorrar')?.value;
    const confirmPass = group.get('pwordBorrar2')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  deleteUser() {
    if (this.eliminarForm.invalid) {
      return;
    }

    if (
      !confirm(
        '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.'
      )
    ) {
      return;
    }

    console.log('Eliminando usuario');
    const { pwordBorrar, pwordBorrar2 } = this.eliminarForm.value;
    console.log(pwordBorrar, this.username);
    this.http
      .delete(`${this.apiUrl}/usuario/delete`, {
        params: {
          pword: pwordBorrar,
          nombre: this.username,
        },
      })
      .subscribe(
        (success) => {
          console.log('Usuario Eliminado');
          this.authService.logout();
        },
        (error) => console.log('Error al eliminar usuario', error.error)
      );
  }
}
