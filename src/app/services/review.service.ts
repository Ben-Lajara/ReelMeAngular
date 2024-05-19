import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ReelMeService } from '../reel-me.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private route: ActivatedRoute,
    private reelme: ReelMeService,
    private http: HttpClient,
    private router: Router
  ) {}

  getReview(usuario: string, idPelicula: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/review`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          usuario,
          idPelicula,
        },
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            this.router.navigate([
              '/review',
              localStorage.getItem('username'),
              idPelicula,
            ]);
          }
          return throwError(error);
        })
      );
  }

  sendReview(body: any, isEdit: boolean): Observable<any> {
    if (isEdit) {
      return this.http.put(`${this.apiUrl}/review`, body).pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
    } else {
      return this.http.post(`${this.apiUrl}/review`, body).pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
    }
  }
}
