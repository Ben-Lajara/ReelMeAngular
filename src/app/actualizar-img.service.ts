import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActualizarImgService {
  private imgActualizadaSrc = new Subject<void>();
  imgActualizadaSrc$ = this.imgActualizadaSrc.asObservable();
  imgActualizada() {
    this.imgActualizadaSrc.next();
  }
}
