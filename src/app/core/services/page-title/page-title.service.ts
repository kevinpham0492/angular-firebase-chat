import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { environment as env } from '@app/env';

@Injectable()
export class PageTitleService {
  constructor(
    private translateService: TranslateService,
    private title: Title
  ) { }

  setTitle(snapshot: ActivatedRouteSnapshot, lazyTranslateService?: TranslateService) {
    let lastChild = snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const { title } = lastChild.data;
    const translate = lazyTranslateService || this.translateService;
    if (title) {
      translate
        .get(title)
        .pipe(filter(translatedTitle => translatedTitle !== title))
        .subscribe(translatedTitle =>
          this.title.setTitle(`${translatedTitle} - ${env.appName}`)
        );
    } else {
      this.title.setTitle(env.appName);
    }
  }
}
