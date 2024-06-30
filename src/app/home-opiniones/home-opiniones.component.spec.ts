import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOpinionesComponent } from './home-opiniones.component';

describe('HomeOpinionesComponent', () => {
  let component: HomeOpinionesComponent;
  let fixture: ComponentFixture<HomeOpinionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeOpinionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeOpinionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
