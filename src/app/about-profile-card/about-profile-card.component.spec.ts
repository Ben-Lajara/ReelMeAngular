import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProfileCardComponent } from './about-profile-card.component';

describe('AboutProfileCardComponent', () => {
  let component: AboutProfileCardComponent;
  let fixture: ComponentFixture<AboutProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutProfileCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
