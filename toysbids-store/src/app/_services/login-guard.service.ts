import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { tokenNotExpired } from 'angular2-jwt';
import { Security } from './security';


@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router, private security: Security) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let access_token = this.security.getStoredToken();
        if (tokenNotExpired("access_token", access_token)) { // not expired token
            return true;
        } else { // expired token
            let rpta = this.loginService.estaLogeado();
            if (+rpta !== 1) {
                sessionStorage.clear();
                this.router.navigate(['login']);
                return false;
            }
        }

        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
    }
}