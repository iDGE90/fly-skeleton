import { Component, OnInit } from '@angular/core';
import {CoreService} from '../../services/core.service';
import {AppError} from 'core/errors/app-error';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list = null;

  working = false;

  constructor(private coreService: CoreService) { }

  ngOnInit() {
    this.working = true;

    this.coreService.list().subscribe((res: any) => {
      this.list = res.data;
      this.working = false;
    }, (error: AppError) => {
      console.log('Home error: ', error);
      this.working = false;
    });
  }

}
