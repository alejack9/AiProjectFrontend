import { TestBed } from '@angular/core/testing';

import { InformationSenderService } from './information-sender.service';

describe('InformationSenderService', () => {
  let service: InformationSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
