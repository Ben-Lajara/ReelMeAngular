import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecimientoComponent } from './restablecimiento.component';

describe('RestablecimientoComponent', () => {
  let component: RestablecimientoComponent;
  let fixture: ComponentFixture<RestablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestablecimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
