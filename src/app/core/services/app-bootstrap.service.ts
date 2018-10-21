import {Injectable} from '@angular/core';
import {CoreService} from './core.service';
import {AuthenticateService} from 'src/app/core/services/authenticate.service';
import {AppError} from 'core/errors/app-error';

@Injectable({
  providedIn: 'root'
})
export class AppBootstrap {

  constructor(private coreService: CoreService,
              private auth: AuthenticateService) {
  }

  getUserFromToken() {
    const token = this.auth.token;

    if (token) {
      this.auth.isUserValidationInProgress = true;

      this.coreService.profile().subscribe((res: any) => {
        this.auth.user = res.data;
        this.auth.isUserValidationInProgress = false;
      }, (error: AppError) => {
        this.auth.isUserValidationInProgress = false;
        this.auth.logoutWithRedirect();
      });
    }
  }
}
