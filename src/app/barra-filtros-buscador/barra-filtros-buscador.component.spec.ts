import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraFiltrosBuscadorComponent } from './barra-filtros-buscador.component';

describe('BarraFiltrosBuscadorComponent', () => {
  let component: BarraFiltrosBuscadorComponent;
  let fixture: ComponentFixture<BarraFiltrosBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraFiltrosBuscadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraFiltrosBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
