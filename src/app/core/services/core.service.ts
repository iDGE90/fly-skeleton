import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/internal/operators';
import {AppErrorHandler} from 'shared/services/app-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient,
              private appErrorHandler: AppErrorHandler) {
  }

  login(data) {
    return this.http.post(environment.baseUrl + 'login', data);
      // .pipe(catchError(this.appErrorHandler.handleError));
  }

  register(data) {
    return this.http.post(environment.baseUrl + 'register', data);
      // .pipe(catchError(this.appErrorHandler.handleError));
  }

  profile(id) {
    return this.http.get(environment.baseUrl + 'asd/users/' + id);
      // .pipe(catchError(this.appErrorHandler.handleError));
  }

  list() {
    return this.http.get(environment.baseUrl + 'unknown/23');
      // .pipe(catchError(this.appErrorHandler.handleError));
  }

  // TODO: dry this catches
}
