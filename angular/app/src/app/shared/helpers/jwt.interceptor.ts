import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { AuthService } from '../services/auth/auth.service'

// If the user is logged in, add the JWT auth token to the request
export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
    const user = inject(AuthService).userValue;
    if (user && user.access) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${user.access}`
            }
        });
    }
    return next(request);
};
