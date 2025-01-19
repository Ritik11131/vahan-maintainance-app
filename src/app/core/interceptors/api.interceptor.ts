import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Don't add the Authorization header for the login or refresh token endpoint
  if (req.url.endsWith('/token')) {
    return next(req);
  }

  // Clone the request to add the authentication header.
  const authReq = req.clone({
    setHeaders: {
      Authorization: authService.getToken() || 'Token Not Found' // Use Bearer token format
    }
  });

  return next(authReq);
};