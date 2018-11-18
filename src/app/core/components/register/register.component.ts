import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CoreService} from 'core/services/core.service';
import {AppError} from 'core/errors/app-error';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    full_name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  working = false;

  constructor(private coreService: CoreService,
              private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.registerForm.valid && !this.working) {
      this.working = true;

      this.coreService.register(this.registerForm.value).subscribe((res: any) => {
        this.working = false;
        this.router.navigate(['/login']);
        console.log('Register response: ', res);
      }, (error: AppError) => {
        this.working = false;
        console.log('Register error: ', error);
      });
    }
  }

}
