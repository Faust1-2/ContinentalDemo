import { Component, Inject } from '@angular/core';
import { Drink } from '@app/types/drink.types';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DrinkService } from '@app/drink.service';

@Component({
  selector: 'app-add-edit-drink-dialog',
  templateUrl: './add-edit-drink-dialog.component.html',
  styleUrls: ['./add-edit-drink-dialog.component.css'],
})
export class AddEditDrinkDialogComponent {

  formGroup = new FormGroup({
    name: new FormControl(this.data.addMode ? '' : this.data.drink.name, [Validators.required]),
    description: new FormControl(this.data.addMode ? '' : this.data.drink.description, []),
    price: new FormControl(this.data.addMode ? 0 : this.data.drink.price, [Validators.required]),
    type: new FormControl(this.data.addMode ? 'beer' : this.data.drink.type, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<AddEditDrinkDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { drink: Drink, addMode: boolean },
              public drinkService: DrinkService) {
  }

  addDrink() {
    this.drinkService.createDrink(this.formGroup.value as Drink).subscribe(() => {
      this.drinkService.getDrinks();
    });
  }

  editDrink() {
    const drink = {
      id: this.data.drink.id,
      name: this.formGroup.value.name,
      description: this.formGroup.value.description,
      price: this.formGroup.value.price,
      type: this.formGroup.value.type,
    } as Drink;

    this.drinkService.updateDrink(drink).subscribe(() => {
      this.drinkService.getDrinks();
      this.dialogRef.close();
    });
  }

  deleteDrink() {
    this.drinkService.deleteDrink(this.data.drink.id ?? '').subscribe(() => {
      this.drinkService.getDrinks();
      this.dialogRef.close();
    });
  }
}
