import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const usuarioRuta = next.params['username'];
      console.log('Usuario de la ruta: ' + usuarioRuta);
      return this.authService.isLoggedIn.pipe(
        switchMap(isLoggedIn => {
          if (!isLoggedIn) {
            console.log('Not logged in');
            this.router.navigate(['/login']);      
            return of(false);
          } else {
            return this.authService.currentUsername.pipe(
              map(user => {
                console.log('User: ' + user);
                if (usuarioRuta === user) {
                  console.log('Logged in as correct user');
                  //this.alertService.showAlert('Access restricted');
                  return true;
                } else {
                  console.log('Access restricted');
                  return false;
                }
              })
            );
          }
        })
      );
    
  }
}
