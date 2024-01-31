import { ActivatedRouteSnapshot, RouterStateSnapshot, createUrlTreeFromSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authGuard = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    if (authService.isLoggedIn) {
        return true;
    } 

    return createUrlTreeFromSnapshot(next, ['/', 'login'], { returnUrl: state.url });
};