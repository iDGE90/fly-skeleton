import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthGuard} from '../shared/guards/auth.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
    ])
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProfileComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {
}
