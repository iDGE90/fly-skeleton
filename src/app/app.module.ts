import {APP_BOOTSTRAP_LISTENER, ComponentRef, ErrorHandler, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {CoreModule} from 'core/core.module';
import {RouterModule} from '@angular/router';
import {AppErrorHandler} from 'core/services/app-error-handler.service';
import {AppBootstrap} from 'core/services/app-bootstrap.service';
import {TokenInterceptor} from 'core/interceptors/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorsInterceptor} from 'core/interceptors/errors.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot([], {})
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      deps: [AppBootstrap],
      useFactory: (appBoot: AppBootstrap) => {
        return (component: ComponentRef<any>) => {
          appBoot.getUserFromToken();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
