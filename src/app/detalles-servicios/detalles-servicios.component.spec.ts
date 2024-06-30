import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesServiciosComponent } from './detalles-servicios.component';

describe('DetallesServiciosComponent', () => {
  let component: DetallesServiciosComponent;
  let fixture: ComponentFixture<DetallesServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
