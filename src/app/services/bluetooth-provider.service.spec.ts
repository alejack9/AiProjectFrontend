import { TestBed } from '@angular/core/testing';

import { BluetoothProviderService } from './bluetooth-provider.service';

describe('BluetoothProviderService', () => {
  let service: BluetoothProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BluetoothProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
