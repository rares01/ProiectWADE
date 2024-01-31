import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const nonAuthGuard = (next: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    if (!authService.isLoggedIn ) {
        return true;
    } 
    return createUrlTreeFromSnapshot(next, ['/', 'home']);
};