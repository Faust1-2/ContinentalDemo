import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { MenuComponent } from '@app/menu/menu.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { AuthGuard, AuthMenuGuard, NotAuthGuard } from '@app/guards/auth.guard';
import { ConnectComponent } from '@app/connect/connect.component';
import { ViewMenuComponent } from '@app/view-menu/view-menu.component';
import { ConfirmUserComponent } from '@app/confirm-user/confirm-user.component';
import { DashboardUserComponent } from '@app/dashboard-user/dashboard-user.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthMenuGuard],
  },
  {
    path: 'view-menu',
    component: ViewMenuComponent,
  },
  {
    path: 'login',
    component: ConnectComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'manage/calendar',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'confirm_account/:token',
    component: ConfirmUserComponent
  },
  {
    path: 'manage/users',
    component: DashboardUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
