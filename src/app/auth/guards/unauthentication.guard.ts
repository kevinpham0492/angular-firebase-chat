import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { Logger } from '@app/core/logger';
import { AuthService } from '../services';

const log = new Logger('UnAuthenticationGuard');

@Injectable()
export class UnAuthenticationGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService
      .isAuthenticated()
      .pipe(
        take(1),
        tap(loggedIn => {
          if (loggedIn) {
            log.debug('authenticated, redirecting...');
            this.router.navigate(['/chats'], { replaceUrl: true });
          }
        })
      );
  }
}
