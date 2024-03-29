import { TestBed } from '@angular/core/testing';

import { ReelMeService } from './reel-me.service';

describe('ReelMeService', () => {
  let service: ReelMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReelMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
