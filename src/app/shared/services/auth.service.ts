import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {throwError, BehaviorSubject, Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User, UserData} from '../models/user.model';
import {Router} from '@angular/router';
import {AuthResponseData} from '../models/auth-response-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: number;

  constructor(private http: HttpClient, private router: Router) {
  }

  private static handleError(errorResult: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error has occurred';
    if (!errorResult.error || !errorResult.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResult.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid username and password combination';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid username and password combination';
        break;
    }
    return throwError(errorMessage);
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${environment.firebaseApiUrl}${environment.firebaseApiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
      .pipe(catchError(AuthService.handleError), tap(result => {
        // expiry of token in line below
          const expirationDate = new Date(new Date().getTime() + +result.expiresIn * 1000 + environment.buffer);
          const user = new User(result.email, result.localId, result.idToken, expirationDate);
          this.user.next(user);
          this.autoLogout(+result.expiresIn * 1000 + environment.buffer);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin(): void {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
