import { TestBed } from '@angular/core/testing';

import { GeolocalizationProviderService } from './geolocalization-provider.service';

describe('GeolocalizationProviderService', () => {
  let service: GeolocalizationProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocalizationProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
