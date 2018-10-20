import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CoreService} from '../../services/core.service';
import {AppError} from '../../errors/app-error';
import {AuthenticateService} from 'core/services/authenticate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  working = false;

  constructor(private coreService: CoreService,
              private auth: AuthenticateService,
              private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.loginForm.valid && !this.working) {
      this.working = true;

      // Get the token, from user info
      this.coreService.login(this.loginForm.value).subscribe((res: any) => {
        this.auth.token = res.token; // Set token

        // Get user info with token
        this.coreService.profile(1).subscribe((x: any) => {
          this.auth.user = x.data; // Set user
          this.router.navigate(['/']); // Redirect to home page
          this.working = false;
        }, (error: AppError) => {
          console.log('User error: ', error);
          this.working = false;
        });
      }, (error: AppError) => {
        console.log('Login error: ', error);
        this.working = false;
      });
    }
  }

}
