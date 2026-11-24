import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    if (inject(AuthService).userValue) {
        return true;
    }
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
};
