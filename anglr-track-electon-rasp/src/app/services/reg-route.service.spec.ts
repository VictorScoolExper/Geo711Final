import { TestBed } from '@angular/core/testing';

import { RegRouteService } from './reg-route.service';

describe('RegRouteService', () => {
  let service: RegRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
