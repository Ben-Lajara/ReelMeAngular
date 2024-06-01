import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesBorrarCuentaComponent } from './ajustes-borrar-cuenta.component';

describe('AjustesBorrarCuentaComponent', () => {
  let component: AjustesBorrarCuentaComponent;
  let fixture: ComponentFixture<AjustesBorrarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjustesBorrarCuentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjustesBorrarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
