import { TestBed, inject } from '@angular/core/testing';

import { KonsensService } from './konsens.service';

describe('KonsensService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KonsensService]
    });
  });

  it('should be created', inject([KonsensService], (service: KonsensService) => {
    expect(service).toBeTruthy();
  }));
});
