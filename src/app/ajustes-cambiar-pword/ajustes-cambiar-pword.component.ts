import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'config';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-ajustes-cambiar-pword',
  templateUrl: './ajustes-cambiar-pword.component.html',
  styleUrl: './ajustes-cambiar-pword.component.css',
})
export class AjustesCambiarPwordComponent implements OnInit {
  @Input() usuario: any;
  @Input() idPeli = '';
  pword = '';
  pword2 = '';
  apiUrl = CONFIG.apiUrl;
  isLoggedIn: Observable<boolean>;
  currentUsername: Observable<string>;
  pwordForm!: UntypedFormGroup;
  exito = false;
  hayError = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private fb: UntypedFormBuilder
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUsername = this.authService.currentUsername;
  }
  ngOnInit(): void {
    this.pwordForm = this.fb.group(
      {
        pword: ['', [Validators.required]],
        pword2: ['', [Validators.required]],
      }
      //{ validator: this.checkPasswords }
    );
  }

  /*checkPasswords(group: UntypedFormGroup) {
    const pass = group.get('pword')?.value;
    const confirmPass = group.get('pword2')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }*/

  setNewPword() {
    if (this.pwordForm.invalid) {
      return;
    }

    const { pword, pword2 } = this.pwordForm.value;

    this.usuario.pword = pword2;
    this.http.put(`${this.apiUrl}/cambiarPword`, this.usuario).subscribe(
      (success) => {
        this.exito = true;
        this.hayError = false;
        this.pwordForm.reset();
      },
      (error) => {
        this.hayError = true;
      }
    );
  }
}
