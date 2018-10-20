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
      this.auth.validatingUser = true;

      this.coreService.profile(1).subscribe((res: any) => {
        this.auth.user = res.data;
        this.auth.validatingUser = false;
      }, (error: AppError) => {
        this.auth.validatingUser = false;
        this.auth.logoutWithRedirect();
      });
    }
  }
}