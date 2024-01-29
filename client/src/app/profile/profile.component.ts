import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth.service';
import { LogUser } from '@app/types/user.types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user?: LogUser;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => this.user = user);
  }
}
