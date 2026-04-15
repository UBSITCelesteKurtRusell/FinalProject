import { TestBed } from '@angular/core/testing';

import { DevilFruitService } from './devil-fruit.service';

describe('DevilFruitService', () => {
  let service: DevilFruitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevilFruitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
