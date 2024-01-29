import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@app/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @ViewChild('header') header?: HTMLElement;
  public links = [
    { name: 'Menu', path: '/menu', auth: false },
    { name: 'Login', path: '/login', auth: false },
    { name: 'Dashboard', path: '/dashboard', auth: true },
  ];

  public transparentBackground = true;

  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    window.scrollTo(0, 0);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/' || event.urlAfterRedirects !== '/') {
          this.transparentBackground = false;
        }
      }
    });
  }

  ngOnInit() {
  }

  async logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/home');
      this.authService.user.next(undefined);
    });
  }
}
