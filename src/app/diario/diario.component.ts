import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReelMeService } from '../reel-me.service';
import { Observable } from 'rxjs';
import { ParamsFiltrosService } from '../params-filtros.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DiarioComponent implements OnInit {
  isLoading = true;
  sortOrder = 'asc';
  @Input() username: string = '';
  reviews: any;
  peliculas: { [key: string]: any } = {};
  ids: any[] = [];
  peli: any;
  private loading: boolean = true;
  apiUrl = 'http://localhost:8080/api';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private reelme: ReelMeService,
    private filtros: ParamsFiltrosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      console.log(this.username);
      this.getReviews(this.username);
      console.log(this.reviews);
      console.log(this.ids);
      //this.getPeliculas();
      console.log(this.peliculas);
    });
  }

  groupReviewsByMonth(reviews: any[]): any {
    const groups: { [key: string]: any[] } = {};

    reviews.forEach((review) => {
      this.ids.push(review.idPelicula.id);
      console.log(this.ids);
      const date = new Date(review.fecha);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(review);
    });

    // Ordena los grupos por mes y año descendientemente
    const sortedGroups: { [key: string]: any[] } = {};
    Object.keys(groups)
      .sort((a, b) => {
        const [yearA, monthA] = a.split('-').map(Number);
        const [yearB, monthB] = b.split('-').map(Number);

        // Siempre ordenar de forma descendente
        return yearB - yearA || monthB - monthA;
      })
      .forEach((key) => {
        // Ordenar las reviews dentro de cada grupo por fecha en orden descendente
        sortedGroups[key] = groups[key].sort((a, b) => {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);
          return dateB.getTime() - dateA.getTime();
        });
      });

    return sortedGroups;
  }

  async getReviews(usuario: string): Promise<void> {
    this.http.get(`${this.apiUrl}/diario/${usuario}`).subscribe(
      async (res: Object) => {
        console.log(res);
        this.reviews = this.groupReviewsByMonth(res as any[]);
        console.log('Antes del await');
        await this.getPeliculas();
        console.log('Despues del await');
        console.log(this.peliculas);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  async getPeliculas(): Promise<void> {
    const promises = this.ids.map((id) => {
      return this.busquedaID(id).toPromise();
    });

    const peliculas = await Promise.all(promises);
    peliculas.forEach((peli, index) => {
      this.peliculas[this.ids[index]] = peli;
    });
  }

  busquedaID(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pelicula/${id}`);
  }

  pelicula() {
    return this.reelme.pelicula();
  }
}
