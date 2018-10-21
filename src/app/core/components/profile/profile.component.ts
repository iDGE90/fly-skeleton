import {Component, OnInit} from '@angular/core';
import {User} from 'shared/models/user';
import {CoreService} from '../../services/core.service';
import {AppError} from 'core/errors/app-error';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = null;

  working = false;

  constructor(private coreService: CoreService) {
  }

  ngOnInit() {
    this.working = true;

    this.coreService.profile().subscribe((res: any) => {
      this.user = res.data;
      console.log(this.user);
      this.working = false;
    }, (error: AppError) => {
      console.log('Profile error: ', error);
      this.working = false;
    });
  }

}
