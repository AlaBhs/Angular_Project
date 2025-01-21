import { TestBed } from '@angular/core/testing';

import { WcService } from './wc.service';

describe('WcService', () => {
  let service: WcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
