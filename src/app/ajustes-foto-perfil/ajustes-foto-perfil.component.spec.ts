import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesFotoPerfilComponent } from './ajustes-foto-perfil.component';

describe('AjustesFotoPerfilComponent', () => {
  let component: AjustesFotoPerfilComponent;
  let fixture: ComponentFixture<AjustesFotoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjustesFotoPerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjustesFotoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
