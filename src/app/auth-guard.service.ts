import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn) {
      console.log('Not logged in');
      this.router.navigate(['/login']);
      return false;
    } else {
      const token = localStorage.getItem('authToken');
      if (token === null || this.authService.tokenExpired(token)) {
        console.log('No token found or token expired');
        this.router.navigate(['/login']);
        return false;
      } else {
        console.log('Logged in with valid token');
        return true;
      }
    }
  }
}
