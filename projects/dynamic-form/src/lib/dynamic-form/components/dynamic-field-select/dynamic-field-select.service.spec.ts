import { TestBed } from '@angular/core/testing';

import { DynamicFieldSelectService } from './dynamic-field-select.service';

describe('DynamicFieldSelectService', () => {
  let service: DynamicFieldSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFieldSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
