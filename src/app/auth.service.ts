import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:8080/api';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');
  private roles = new BehaviorSubject<string[]>([]);
  private admin = new BehaviorSubject<boolean>(false);

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

  constructor(private http: HttpClient, private router: Router) {
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

  register(nombre: string, pword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/register`, { nombre, pword });
  }

  login(nombreEmail: string, pword: string): Observable<any> {
    const fd = new FormData();
    fd.append('nombreEmail', nombreEmail);
    fd.append('pword', pword);
    return this.http.post(`${this.apiUrl}/usuario/loginNombreEmail`, fd).pipe(
      tap((data: any) => {
        if (data.status === 'success') {
          this.loggedIn.next(true);
          this.username.next(data.usuario.nombre);
          localStorage.setItem('username', data.usuario.nombre);
          localStorage.setItem('veto', data.usuario.veto);
          let fechaActual = new Date();
          let fechaVeto = new Date(data.usuario.veto);
          if (fechaActual > fechaVeto) {
            this.http
              .put(
                `${this.apiUrl}/usuario/levantarVeto`,
                {},
                {
                  params: {
                    nombre: data.usuario.nombre,
                  },
                }
              )
              .subscribe((res: any) => {
                console.log(res);
              });
          }
          this.roles.next(data.roles);
          console.log('Roles: ', data.roles);
          const rolesArray = Array.isArray(data.roles)
            ? data.roles
            : [data.roles];
          this.roles.next(rolesArray);
          console.log('Logged in');
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('roles', JSON.stringify(rolesArray));
          console.log(JSON.stringify(rolesArray));
          console.log(data.token);
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
