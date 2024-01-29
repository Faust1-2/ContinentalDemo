import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { User } from '@app/types/user.types';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.scss']
})
export class ConfirmUserComponent {

  protected readonly formGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  protected userId: string;
  protected user?: User;
  private readonly token: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.userId = jwtDecode<{ userId: string }>(this.token)['userId'];
    this.authService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
    });
  }

  confirmUser(event: SubmitEvent) {
    event.preventDefault();
    if (this.formGroup.valid) {
      const { lastName, firstName, password, rePassword } = this.formGroup.value;
      this.authService.confirm(this.token, {
        lastName: lastName ?? "",
        firstName: firstName ?? "",
        password: password ?? "",
        rePassword: rePassword ?? "",
        isConfirmed: true,
      }).subscribe(async (user) => {
        this.toastr.success(`Welcome ${user.firstName} ${user.lastName}!`);
        await this.router.navigate(['/dashboard']);
      })
    }
  }

  private rePasswordValidators(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.formGroup.get('password');
    const confirmPassword = this.formGroup.get('rePassword');
    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        return { rePassword: true };
      }
    }
    return null;
  }
}
