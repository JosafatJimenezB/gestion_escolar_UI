import { CanActivateFn } from '@angular/router';

export const authExpirationGuard: CanActivateFn = (route, state) => {
  return true;
};
