import { TestBed } from '@angular/core/testing';

import { DeviceResourceService } from './device-resource.service';

describe('DeviceResourceService', () => {
  let service: DeviceResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
