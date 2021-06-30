import { TestBed } from '@angular/core/testing';

import { QuacksPreloadGuard } from './quacks-preload.guard';

describe('QuacksPreloadGuard', () => {
  let guard: QuacksPreloadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuacksPreloadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
