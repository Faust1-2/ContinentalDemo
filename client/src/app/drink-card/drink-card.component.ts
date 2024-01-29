import { Component, Input } from '@angular/core';
import { Drink } from '@app/types/drink.types';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDrinkDialogComponent } from '@app/add-edit-drink-dialog/add-edit-drink-dialog.component';

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.css'],
})
export class DrinkCardComponent {
  @Input('drink') public drink!: Drink;

  constructor(public dialog: MatDialog) {
  }

  onClick() {
    const dialogRef = this.dialog.open(AddEditDrinkDialogComponent, {
      data: {
        drink: this.drink,
        addMode: false,
      },
      closeOnNavigation: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
