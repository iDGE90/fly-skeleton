import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from 'core/services/authenticate.service';
import {User} from 'shared/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User = null;

  constructor(private auth: AuthenticateService,
              private router: Router) {
  }

  ngOnInit() {
    this.auth.$userUpdate.subscribe((u: User) => {
      this.user = u;
    });
  }

  logout() {
    this.auth.logoutWithRedirect();
  }

}
