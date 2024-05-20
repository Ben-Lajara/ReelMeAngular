import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReviewSeguidoComponent } from './card-review-seguido.component';

describe('CardReviewSeguidoComponent', () => {
  let component: CardReviewSeguidoComponent;
  let fixture: ComponentFixture<CardReviewSeguidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardReviewSeguidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReviewSeguidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
