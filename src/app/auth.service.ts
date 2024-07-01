import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  BehaviorSubject,
  tap,
  map,
  catchError,
  throwError,
} from 'rxjs';
import { CONFIG } from 'config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = CONFIG.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');
  private roles = new BehaviorSubject<string[]>([]);
  private admin = new BehaviorSubject<boolean>(false);
  private perfil = new BehaviorSubject<string>('');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUsername() {
    return this.username.asObservable();
  }

  get rolesUsuario() {
    return this.roles.asObservable();
  }

  get isAdmin(): Observable<boolean> {
    return this.roles.pipe(map((roles) => roles.includes('ROLE_ADMIN')));
  }

  get currentPerfil() {
    return this.perfil.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {
    this.inicializarUsuario();
  }

  inicializarUsuario() {
    const authToken = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const rolesString = localStorage.getItem('roles');
    const roles = rolesString ? JSON.parse(rolesString) : [];
    console.log('Roles const: ', roles);

    if (authToken && username && roles) {
      this.loggedIn.next(true);
      this.username.next(username);
      this.roles.next(roles);
    }
  }

  setSession(username: string, token: string, roles: string[], perfil: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('perfil', perfil);

    this.loggedIn.next(true);
    this.username.next(username);
    this.roles.next(roles);
  }

  register(nombre: string, email: string, pword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/register`, {
      nombre,
      email,
      pword,
    });
  }

  login(nombreEmail: string, pword: string): Observable<any> {
    const fd = new FormData();
    fd.append('nombreEmail', nombreEmail);
    fd.append('pword', pword);
    return this.http.post(`${this.apiUrl}/usuario/loginNombreEmail`, fd).pipe(
      catchError((error) => {
        return throwError(error); // Propagar el error para que se maneje en el componente LoginComponent
      }),
      tap((data: any) => {
        if (data.status === 'success') {
          const rolesArray = Array.isArray(data.roles)
            ? data.roles
            : [data.roles];
          this.setSession(data.username, data.token, rolesArray, data.perfil);
        }
      })
    );
  }

  public tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  logout(): void {
    console.log('Logged out');
    this.loggedIn.next(false);
    this.username.next('');
    // Elimina el token de autenticación y el nombre de usuario de localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    this.router.navigate(['/home']);
  }
}
