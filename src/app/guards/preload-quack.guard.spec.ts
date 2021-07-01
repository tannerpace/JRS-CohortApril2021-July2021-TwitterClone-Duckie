import { TestBed } from '@angular/core/testing';

import { PreloadQuackGuard } from './preload-quack.guard';

describe('PreloadQuackGuard', () => {
  let guard: PreloadQuackGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreloadQuackGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
