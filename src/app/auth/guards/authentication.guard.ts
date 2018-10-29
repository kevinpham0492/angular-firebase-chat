import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { Logger } from '@app/core/logger';
import { CONFIG } from '../auth.config';
import { AuthService } from '../services';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService
      .isAuthenticated()
      .pipe(
        take(1),
        tap(loggedIn => {
          if (!loggedIn) {
            log.debug('Not authenticated, redirecting...');
            this.router.navigate([CONFIG.LOGIN.PATH], { replaceUrl: true });
          }
        })
      );
  }
}
