import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  username = '';
  peliculas: {[key: string]: any} = {};
  ids: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
    });
  }

  async getSeguidos(nombre: string): Promise<any> {
    const response = await this.http.post('http://localhost/connection.php', {nombre, action: 'getSeguidos'}).toPromise();
    await this.getPeliculas();
    return response;
  }

  async getPeliculas(): Promise<void> {
    const promises = this.ids.map(id => {
      return this.busquedaID(id).toPromise();
    });
  
    const peliculas = await Promise.all(promises);
    peliculas.forEach((peli, index) => {
      this.peliculas[this.ids[index]] = peli;
    });
  }
  
  busquedaID(id: string): Observable<any> {
    return this.http.post('http://localhost/connection.php', {id, action: 'buscarID'});
  }
}
