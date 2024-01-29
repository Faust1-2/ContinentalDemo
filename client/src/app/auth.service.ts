import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfirmUserDto, LogUser, RegisterUser, User } from '@app/types/user.types';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public readonly user = new BehaviorSubject<User | undefined>(undefined);
  public readonly users = new BehaviorSubject<User[]>([]);

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  handleError(error: HttpErrorResponse) {
    const toastr = inject(ToastrService);
    toastr.error(error.error.message, error.error.name);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  isAuthenticated() {
    return this.cookieService.check('Authentication');
  }

  getUserById(userId: string) {
    return this.httpClient.get<User>(`users/${userId}`, { withCredentials: true });
  }

  getUser() {
    return this.httpClient.get<User>('authentication/me', { withCredentials: true });
  }

  getUsers() {
    return this.httpClient.get<User[]>('users').subscribe((users) => {
      this.users.next(users);
    });
  }

  login(logUser: LogUser) {
    const options = { withCredentials: true };
    return this.httpClient.post<User>('authentication/login', logUser, options);
  }

  register(registerUser: RegisterUser) {
    return this.httpClient.post<RegisterUser>('authentication/register', registerUser);
  }

  confirm(token: string, confirmUser: ConfirmUserDto) {
    return this.httpClient.post<User>(`users/confirm/${token}`, { confirmUser }, { withCredentials: true }).pipe(
      catchError(this.handleError),
    );
  }

  logout() {
    this.user.next(undefined);
    this.cookieService.delete('Authentication');

    return this.httpClient.post('authentication/logout', {}, {
      withCredentials: true,
    });
  }
}
