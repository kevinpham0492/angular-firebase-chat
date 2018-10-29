import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, retryWhen, catchError } from 'rxjs/operators';

import { environment as env } from '@app/env';
import { Logger } from '@app/core/logger';

const log = new Logger('ErrorHandlerInterceptor');

export interface RetryStrategyConfig {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: Array<number>;
}

export const defaultRetryStrategyConfig: RetryStrategyConfig = {
  maxRetryAttempts: env.maxRetryAttempts,
  scalingDuration: 1000,
  excludedStatusCodes: [401, 403, 404]
};

export const genericRetryStrategy = (config: RetryStrategyConfig = defaultRetryStrategyConfig) =>
  (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (retryAttempt > config.maxRetryAttempts ||
          config.excludedStatusCodes.find(e => e === error.status)) {
          return throwError(error);
        }
        log.info(`Attempt ${retryAttempt}: retrying the request in ${retryAttempt * config.scalingDuration}ms`
        );
        return timer(retryAttempt * config.scalingDuration);
      })
    );
  };

@Injectable()
export class RetryHttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req).pipe(
        retryWhen(genericRetryStrategy()),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

}
