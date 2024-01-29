import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from '@app/menu/menu.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '@app/home/home.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { ContextMenuModule, SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { RecurrenceEditorModule, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { HeaderComponent } from '@app/header/header.component';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { DatePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { MenuDialogComponent } from '@app/menu-dialog/menu-dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { EventCardComponent } from '@app/event-card/event-card.component';
import { DrinkCardComponent } from '@app/drink-card/drink-card.component';
import { AddEditDrinkDialogComponent } from '@app/add-edit-drink-dialog/add-edit-drink-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ConnectComponent } from '@app/connect/connect.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ViewMenuComponent } from '@app/view-menu/view-menu.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BaseInterceptor } from '@app/base.interceptor';
import { environment } from '@app/environment';
import { ConfirmUserComponent } from '@app/confirm-user/confirm-user.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { UploadTvDialogComponent } from './upload-tv-dialog/upload-tv-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    MenuDialogComponent,
    EventCardComponent,
    DrinkCardComponent,
    AddEditDrinkDialogComponent,
    ConnectComponent,
    ViewMenuComponent,
    ConfirmUserComponent,
    DashboardUserComponent,
    UploadTvDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ContextMenuModule,
    ScheduleModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    SidebarModule,
    DatePickerModule,
    DateTimePickerModule,
    RecurrenceEditorModule,
    ToastModule,
    ListViewModule,
    DropDownButtonModule,
    DialogModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    GridModule,
    ButtonModule,
    ToastrModule.forRoot(),
    MatTableModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BaseInterceptor,
    multi: true,
  },
  provideToastr(),
  {
    provide: 'BASE_API_URL', useValue: environment.apiUrl,
  },
  CookieService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
