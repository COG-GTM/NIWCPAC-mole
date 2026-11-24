import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    private router = inject(Router);
    private _authService = inject(AuthService);


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this._authService.userValue;
        if (user) {
            return true;
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}