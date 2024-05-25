import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReviewLastactivityComponent } from './card-review-lastactivity.component';

describe('CardReviewLastactivityComponent', () => {
  let component: CardReviewLastactivityComponent;
  let fixture: ComponentFixture<CardReviewLastactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardReviewLastactivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReviewLastactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
