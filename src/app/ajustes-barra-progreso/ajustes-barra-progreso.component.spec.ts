import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesBarraProgresoComponent } from './ajustes-barra-progreso.component';

describe('AjustesBarraProgresoComponent', () => {
  let component: AjustesBarraProgresoComponent;
  let fixture: ComponentFixture<AjustesBarraProgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjustesBarraProgresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjustesBarraProgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
