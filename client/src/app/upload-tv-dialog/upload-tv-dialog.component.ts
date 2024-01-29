import { Component } from '@angular/core';
import { DrinkService } from '@app/drink.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-tv-dialog',
  templateUrl: './upload-tv-dialog.component.html',
  styleUrls: ['./upload-tv-dialog.component.scss']
})
export class UploadTvDialogComponent {
  constructor(private dialogRef: MatDialogRef<UploadTvDialogComponent>, private drinksService: DrinkService, private snackBar: MatSnackBar) {
  }

  uploadToTv(fileId: string) {
    this.drinksService.uploadTV(fileId).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open('Menu envoyé à la TV', 'Fermer', {
        duration: 2000,
      });
    });
  }
}
