import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { MenuComponent } from '@app/menu/menu.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { ViewMenuComponent } from '@app/view-menu/view-menu.component';
import { DashboardUserComponent } from '@app/dashboard-user/dashboard-user.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'view-menu',
    component: ViewMenuComponent,
  },
  {
    path: 'manage/calendar',
    component: DashboardComponent,
  },
  {
    path: 'manage/users',
    component: DashboardUserComponent,
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
