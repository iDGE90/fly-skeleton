import {ErrorHandler, Injectable} from '@angular/core';
import {throwError} from 'rxjs/index';
import {BadRequest} from 'core/errors/bad-request';
import {Unauthorized} from 'core/errors/unauthorized';
import {Forbidden} from 'core/errors/forbidden';
import {NotFound} from 'core/errors/not-found';
import {ServerError} from 'core/errors/server-error';
import {AppError} from 'core/errors/app-error';

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log('App error handler: ', error);

    if (error) {
      if (error.status === 400) {
        return throwError(new BadRequest(error));
      }

      if (error.status === 401) {
        return throwError(new Unauthorized(error));
      }

      if (error.status === 403) {
        return throwError(new Forbidden(error));
      }

      if (error.status === 404) {
        return throwError(new NotFound(error));
      }

      if (error.status === 500) {
        return throwError(new ServerError(error));
      }

      return throwError(new AppError(error));
    }
  }
}
