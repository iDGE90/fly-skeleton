import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {tap} from 'rxjs/operators';
import {catchError} from 'rxjs/internal/operators';
import {AppErrorHandler} from 'core/services/app-error-handler.service';
import {Injectable} from '@angular/core';
import {AuthenticateService} from 'core/services/authenticate.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private appErrorHandler: AppErrorHandler,
              private auth: AuthenticateService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Do stuff with the response if you want
        }
      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            // Handle unauthorized response
            this.auth.redirectToLogin();
          }
        }
      }),
      catchError(this.appErrorHandler.handleError)
    );
  }
}
