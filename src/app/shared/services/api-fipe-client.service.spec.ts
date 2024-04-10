import { TestBed } from '@angular/core/testing';

import { ApiFipeClientService } from './api-fipe-client.service';

describe('ApiFipeClientService', () => {
  let service: ApiFipeClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFipeClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
