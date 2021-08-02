import { TestBed } from '@angular/core/testing';

import { GatewayResourceService } from './gateway-resource.service';

describe('GatewayResourceService', () => {
  let service: GatewayResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatewayResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
