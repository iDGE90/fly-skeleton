import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticateService} from 'core/services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticateService) {
  }

  // This guard will always be fired after app bootstrap
  // Validating either started (is in process) or finished
  // If finished there will or won't be a user
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.user !== null) {
      return true;
    } else {
      if (this.auth.isUserValidationInProgress) {
        return this.auth.validatingUserObservable();
      } else {
        this.auth.logoutWithRedirect(state.url);
      }
    }

    return false;
  }
}
