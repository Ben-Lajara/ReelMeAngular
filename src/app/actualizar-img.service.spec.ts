import { TestBed } from '@angular/core/testing';

import { ActualizarImgService } from './actualizar-img.service';

describe('ActualizarImgService', () => {
  let service: ActualizarImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
