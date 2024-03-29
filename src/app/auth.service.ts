import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUsername() {
    return this.username.asObservable();
  }

  constructor(private http: HttpClient) { }

  register(nombre: string, pword: string): Observable<any> {
    return this.http.post('http://localhost:8080/register', { nombre, pword });
  }
  login(nombre: string, pword: string): Observable<any> {
    return this.http.post('http://localhost:8080/login', { nombre, pword}).pipe(
      tap((data: any) => {
        if (data.status === 'success') {
          this.loggedIn.next(true);
          this.username.next(nombre);
          console.log('Logged in');
          localStorage.setItem('isAuthenticated', 'true');
        }
      })
    );
  }

  logout(): void {
    console.log('Logged out');
    this.loggedIn.next(false);
    this.username.next('');
    // Remove the token from local storage or invalidate it on the server
  }
}
