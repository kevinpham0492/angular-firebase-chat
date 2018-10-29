import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AnimationBuilder } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class SplashScreenService {
  splashScreenEl;

  constructor(private animationBuilder: AnimationBuilder,
              @Inject(DOCUMENT) private document: any,
              private router: Router) {
    this.splashScreenEl = this.document.body.querySelector('#splash-screen');

    const hideOnLoad = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd && event.url.indexOf('login-callback') < 0) {
          setTimeout(() => {
            this.hide();
            hideOnLoad.unsubscribe();
          }, 0);
        }
      }
    );
  }

  show() {
    this.splashScreenEl.classList.add('show');
  }

  hide() {
    this.splashScreenEl.classList.remove('show');
  }
}
