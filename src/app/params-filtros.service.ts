import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsFiltrosService {
  private orden: string = "";
  constructor() { }

  getOrden(): string {
    return this.orden;
  }

  setNewOrden(newOrden: string) {
    this.orden = newOrden;
  }
}
