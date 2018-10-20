import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/internal/operators';
import {AppErrorHandler} from 'core/services/app-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) {
  }

  login(data) {
    return this.http.post(environment.baseUrl + 'login', data);
  }

  register(data) {
    return this.http.post(environment.baseUrl + 'register', data);
  }

  profile(id) {
    return this.http.get(environment.baseUrl + 'users/' + id);
  }

  list() {
    return this.http.get(environment.baseUrl + 'unknown');
  }
}
