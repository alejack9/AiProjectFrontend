import { TestBed } from '@angular/core/testing';

import { WifiProviderService } from './wifi-provider.service';

describe('WifiService', () => {
  let service: WifiProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WifiProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
