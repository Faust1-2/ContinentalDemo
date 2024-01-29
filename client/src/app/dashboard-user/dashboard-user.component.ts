import { Component } from '@angular/core';
import { AuthService } from '@app/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent {

  protected formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  protected columns = ['email', 'isConfirmed'];

  constructor(protected authService: AuthService, private toastr: ToastrService) {
    this.authService.getUsers();
  }

  registerUser(event: SubmitEvent) {
    event.preventDefault();
    const email = this.formGroup.get('email')?.value;

    if (email) {
      this.authService.register({ email }).subscribe(() => {
        this.formGroup.reset();
        this.authService.getUsers();
        this.toastr.success('Utilisateur créé avec succès !', 'Succès');
      });
    } else {
      this.toastr.error('Veuillez renseigner un email', 'Erreur');
    }
  }
}
