import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service'

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService);
    return next(request).pipe(catchError(err => {
        if (err.status === 401) {
            authService.userLogout();
            location.reload();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
    }));
};
