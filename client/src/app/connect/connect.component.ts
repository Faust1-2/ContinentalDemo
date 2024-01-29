import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { User } from '@app/types/user.types';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent {

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  error = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private toastr: ToastrService) {
  }

  login() {
    const { email, password } = this.formGroup.value;

    this.authService.login({
      email: email ?? '',
      password: password ?? '',
    }).pipe<User>(catchError((error) => {
      this.toastr.error('Mauvais identifiants', 'Erreur');
      return throwError(() => new Error('Something bad happened; please try again later.'))
    })).subscribe((user) => {
      void this.router.navigate(['/dashboard']);
      this.error = false;
      this.authService.user.next(user);
      this.snackBar.open('Vous êtes connecté ' + this.authService.user.value?.email, 'Fermer', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
