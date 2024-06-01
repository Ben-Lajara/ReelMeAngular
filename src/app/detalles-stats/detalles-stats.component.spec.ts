import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesStatsComponent } from './detalles-stats.component';

describe('DetallesStatsComponent', () => {
  let component: DetallesStatsComponent;
  let fixture: ComponentFixture<DetallesStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
