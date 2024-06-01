import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReviewedSeguidoComponent } from './detalles-reviewed-seguido.component';

describe('DetallesReviewedSeguidoComponent', () => {
  let component: DetallesReviewedSeguidoComponent;
  let fixture: ComponentFixture<DetallesReviewedSeguidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesReviewedSeguidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesReviewedSeguidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
