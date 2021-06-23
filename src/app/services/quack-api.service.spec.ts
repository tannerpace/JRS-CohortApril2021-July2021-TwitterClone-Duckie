import { TestBed } from '@angular/core/testing';

import { QuackApiService } from './quack-api.service';

describe('QuackApiService', () => {
  let service: QuackApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuackApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
