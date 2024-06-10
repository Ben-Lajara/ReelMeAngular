import { Component, OnInit } from '@angular/core';
import { ReelMeService } from '../reel-me.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  pelisControl = new FormControl('');

  constructor(private reelme: ReelMeService) {}

  ngOnInit(): void {
    this.pelisControl.valueChanges
      .pipe(
        debounceTime(300), // Retraso de 300ms
        distinctUntilChanged()
      )
      .subscribe((value) => {
        if (value !== null && value.trim() !== '') {
          this.busqueda(value);
        }
      });
  }

  busqueda(value: string) {
    this.reelme.busqueda(value);
  }

  /*busquedaID() {
    this.reelme.busquedaId(this.id);
  }*/

  peliculas() {
    return this.reelme.peliculas();
  }

  pelicula() {
    return this.reelme.pelicula();
  }
}
