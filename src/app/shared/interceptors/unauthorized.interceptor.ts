import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {tap} from 'rxjs/operators';
import {catchError} from 'rxjs/internal/operators';
import {AppErrorHandler} from 'shared/services/app-error-handler.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private appErrorHandler: AppErrorHandler) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            // redirect to the login route
            // or show a modal
          }

          if (error.status === 404) {
            console.log(404);
          }
        }
      }),
      catchError(this.appErrorHandler.handleError)
      // TODO:
    );
  }
}
