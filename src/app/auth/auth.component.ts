import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnDestroy {
  isLoading = false;
  error: string;
  authSubscription = new Subscription();

  constructor(private router: Router, private authService: AuthService) {
    this.error = undefined;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    this.authSubscription = this.authService.login(email, password)
      .subscribe(result => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
          this.error = error;
          this.isLoading = false;
        }
      );
    form.reset();
  }
}
