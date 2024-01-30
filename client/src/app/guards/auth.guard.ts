import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const AuthGuard = ()=> {
  return true
}

export const AuthMenuGuard = () => {
  return true;
}

export const NotAuthGuard = ()=> {
  return false;
}
