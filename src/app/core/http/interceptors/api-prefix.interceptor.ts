import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@app/env';

/**
 * Prefixes all requests with `env.server.rootApi`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: env.server.rootApi + request.url });
    }
    return next.handle(request);
  }
}
