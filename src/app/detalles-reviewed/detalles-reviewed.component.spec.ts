import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReviewedComponent } from './detalles-reviewed.component';

describe('DetallesReviewedComponent', () => {
  let component: DetallesReviewedComponent;
  let fixture: ComponentFixture<DetallesReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesReviewedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
