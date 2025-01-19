import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import { AuthService } from '@/app/core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated() ? true : inject(Router).createUrlTree(['/auth/login'])
};
