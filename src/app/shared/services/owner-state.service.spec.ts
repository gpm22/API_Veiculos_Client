import { TestBed } from '@angular/core/testing';

import { OwnerStateService } from './owner-state.service';

describe('OwnerStateService', () => {
  let service: OwnerStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
