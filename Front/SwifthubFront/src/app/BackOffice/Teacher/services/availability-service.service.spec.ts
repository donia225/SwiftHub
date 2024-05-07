import { TestBed } from '@angular/core/testing';

import { AvailabilityServiceService } from './availability-service.service';

describe('AvailabilityServiceService', () => {
  let service: AvailabilityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
