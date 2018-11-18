import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CoreService} from 'core/services/core.service';
import {AppError} from 'core/errors/app-error';
import {AuthenticateService} from 'core/services/authenticate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Utilities} from "shared/services/utilties";

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

  backUrl = null;
  working = false;

  constructor(private coreService: CoreService,
              private auth: AuthenticateService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.has('back')) {
      this.backUrl = this.route.snapshot.queryParamMap.get('back');
    }
  }

  submit(): void {
    if (this.loginForm.valid && !this.working) {
      this.working = true;

      // Get the token, from user info
      this.coreService.login(this.loginForm.value).subscribe((res: any) => {
        this.auth.token = res.token; // Set token

        // Get user info with token
        this.coreService.profile().subscribe((x: any) => {
          this.auth.user = x.data; // Set user

          if (this.backUrl) {
            this.router.navigateByUrl(this.backUrl); // Redirect to url before guard redirected to login
          } else {
            this.router.navigate(['/']); // Redirect to home page
          }

          this.working = false;
        }, (error: AppError) => {
          console.log('User error: ', error);
          this.working = false;
        });
      }, (error: AppError) => {
        console.log('Login error: ', error);
        this.working = false;
      });
    } else {
      Utilities.validateMixedForm(this.loginForm);
    }
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  isControlInvalid(c: AbstractControl): boolean {
    return Utilities.isFormControlInvalid(c);
  }

}
