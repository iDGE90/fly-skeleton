import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CoreService} from '../../services/core.service';
import {AppError} from 'shared/errors/app-error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  working = false;

  constructor(private coreService: CoreService) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.registerForm.valid && !this.working) {
      this.working = true;

      this.coreService.register(this.registerForm.value).subscribe((res: any) => {
        this.working = false;
        console.log('Register response: ', res);
      }, (error: AppError) => {
        this.working = false;
        console.log('Register error: ', error);
      });
    }
  }

}
