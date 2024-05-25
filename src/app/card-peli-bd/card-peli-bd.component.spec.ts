import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPeliBdComponent } from './card-peli-bd.component';

describe('CardPeliBdComponent', () => {
  let component: CardPeliBdComponent;
  let fixture: ComponentFixture<CardPeliBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPeliBdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPeliBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
