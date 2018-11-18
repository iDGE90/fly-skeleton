import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) {
  }

  login(data): Observable<Object> {
    return this.http.post(environment.baseUrl + 'login', data);
  }

  register(data): Observable<Object> {
    return this.http.post(environment.baseUrl + 'register', data);
  }

  profile(): Observable<Object> {
    return this.http.get(environment.baseUrl + 'users/1');
  }

  list(): Observable<Object> {
    return this.http.get(environment.baseUrl + 'unknown');
  }
}
