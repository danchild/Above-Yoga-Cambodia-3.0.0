import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthorized: boolean;

  constructor(private authService: AuthService) {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthorized = !!user;
    });
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
