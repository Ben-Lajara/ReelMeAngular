import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesCambiarPwordComponent } from './ajustes-cambiar-pword.component';

describe('AjustesCambiarPwordComponent', () => {
  let component: AjustesCambiarPwordComponent;
  let fixture: ComponentFixture<AjustesCambiarPwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjustesCambiarPwordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjustesCambiarPwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
