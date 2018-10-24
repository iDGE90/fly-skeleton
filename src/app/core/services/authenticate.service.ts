import {Injectable} from '@angular/core';
import {User} from '../../shared/models/user';
import {BehaviorSubject, Observable, Subject} from 'rxjs/index';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  // On app bootstrap if there is token, app wil try to get the user, without changing route
  // If in process of validating this _isUserValidationInProgress will be set to true
  private _isUserValidationInProgress = false;

  // Used in auth guard to determine when validating finished
  $validatingUserUpdate = new Subject<boolean>();

  // User data
  private _user: User = null;

  // Streaming user updates throughout the application
  $userUpdate = new BehaviorSubject<User>(this.user);

  constructor(private router: Router) {
  }

  get user(): User {
    return this._user;
  }

  set user(u: User | null) {
    this._user = u ? u : null;

    if (!u) {
      this.token = null;
    }

    this.$userUpdate.next(this._user);
  }

  get token(): string {
    const token = localStorage.getItem('token');

    return token ? token : null;
  }

  set token(t: string | null) {
    if (t) {
      localStorage.setItem('token', t);
    } else {
      localStorage.removeItem('token');
    }
  }

  get isUserValidationInProgress(): boolean {
    return this._isUserValidationInProgress;
  }

  set isUserValidationInProgress(v: boolean) {
    this._isUserValidationInProgress = v;
    this.$validatingUserUpdate.next(!!this.user);
  }

  validatingUserObservable(): Observable<boolean> {
    return this.$validatingUserUpdate.asObservable();
  }

  logout() {
    this.user = null;
  }

  logoutWithRedirect(logout = true) {
    if (logout) {
      this.logout();
    }

    this.router.navigate(['/login']);
  }
}
