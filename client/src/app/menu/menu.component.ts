import { Component, OnInit } from '@angular/core';
import { DrinkService } from '@app/drink.service';
import { Drink } from '@app/types/drink.types';
import { AddEditDrinkDialogComponent } from '@app/add-edit-drink-dialog/add-edit-drink-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadTvDialogComponent } from '@app/upload-tv-dialog/upload-tv-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  public beers: Drink[] = [];
  public wines: Drink[] = [];
  public cocktails: Drink[] = [];
  public softs: Drink[] = [];

  public apiUrl = 'http://localhost:3000/drinks';

  public drinkTypes = ['beer', 'wine', 'cocktail', 'mocktail'];

  constructor(private drinkService: DrinkService, private snackBar: MatSnackBar, public dialog: MatDialog, public router: Router, public authService: AuthService) {
  }

  async ngOnInit() {
    this.drinkService.getDrinks();
  }

  openCreateDrinkModal() {
    const dialogRef = this.dialog.open(AddEditDrinkDialogComponent, {
      data: {
        drink: undefined,
        addMode: true,
      },
      closeOnNavigation: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.drinkService.getDrinks();
    });
  }

  openUploadTvModal() {
    const dialogRef = this.dialog.open(UploadTvDialogComponent, {
      closeOnNavigation: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.drinkService.getDrinks();
    });
  }


  getDrink(type: string) {
    return this.drinkService.drinks.value.filter((drink) => drink.type === type);
  }

  deleteDrink(drink: Drink) {
    return this.drinkService.deleteDrink(drink.id ?? '').subscribe((drink) => {
      this.drinkService.getDrinks();
    });
  }
}
