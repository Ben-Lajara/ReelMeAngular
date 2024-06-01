import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesPersonalizarComponent } from './ajustes-personalizar.component';

describe('AjustesPersonalizarComponent', () => {
  let component: AjustesPersonalizarComponent;
  let fixture: ComponentFixture<AjustesPersonalizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjustesPersonalizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjustesPersonalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
