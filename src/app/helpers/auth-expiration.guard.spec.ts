import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authExpirationGuard } from './auth-expiration.guard';

describe('authExpirationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authExpirationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
