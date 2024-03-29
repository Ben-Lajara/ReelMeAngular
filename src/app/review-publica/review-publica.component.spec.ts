import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPublicaComponent } from './review-publica.component';

describe('ReviewPublicaComponent', () => {
  let component: ReviewPublicaComponent;
  let fixture: ComponentFixture<ReviewPublicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPublicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
