import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@app/auth.service';
import { ToastrService } from 'ngx-toastr';

export const AuthGuard = ()=> {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated())
    return true
  else {
    router.navigateByUrl('/login').then(() => {
      const toastr = inject(ToastrService);
      toastr.error('Please login to access this page', 'Error');
    });
    return false;
  }
}

export const AuthMenuGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigateByUrl('/view-menu').then(() => {
      const toastr = inject(ToastrService);
      toastr.error('Please login to access this page', 'Error');
    });
    return false;
  } else return true;
}

export const NotAuthGuard = ()=> {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated())
    return true
  else {
    router.navigateByUrl('/home').then(() => {
      const toastr = inject(ToastrService);
      toastr.error('You are already logged in', 'Error');
    });
    return false;
  }
}
