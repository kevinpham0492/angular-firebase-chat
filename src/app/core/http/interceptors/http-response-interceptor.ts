import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';

class DataResponse {
}

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        filter((event: HttpEvent<any>) => {
          return event instanceof HttpResponse;
        }),
        map((response: HttpResponse<any>) => {
          // if (event.ok && event.status === 200) {
          //
          //   const responseBody: DataResponse = {
          //     status: 200,
          //     statusText: 'OK',
          //     data: event.body
          //   };
          //   return event.clone({body: responseBody});
          // }
          return response;
        })
      );
  }
}
