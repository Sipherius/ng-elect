import { TestBed, inject } from '@angular/core/testing';

import { KoalitionService } from './koalition.service';

describe('KoalitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KoalitionService]
    });
  });

  it('should be created', inject([KoalitionService], (service: KoalitionService) => {
    expect(service).toBeTruthy();
  }));
});
