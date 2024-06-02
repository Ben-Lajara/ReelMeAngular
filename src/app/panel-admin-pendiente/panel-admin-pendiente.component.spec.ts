import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdminPendienteComponent } from './panel-admin-pendiente.component';

describe('PanelAdminPendienteComponent', () => {
  let component: PanelAdminPendienteComponent;
  let fixture: ComponentFixture<PanelAdminPendienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelAdminPendienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelAdminPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
