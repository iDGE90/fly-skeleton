import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/internal/operators';
import {AppErrorHandler} from 'core/services/app-error-handler.service';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) {
  }

  login(data): Observable {
    return this.http.post(environment.baseUrl + 'login', data);
  }

  register(data): Observable {
    return this.http.post(environment.baseUrl + 'register', data);
  }

  profile(): Observable {
    return this.http.get(environment.baseUrl + 'users/1');
  }

  list(): Observable {
    return this.http.get(environment.baseUrl + 'unknown');
  }
}
