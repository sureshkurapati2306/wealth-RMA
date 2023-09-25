import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from '../components/custom-snack-bar/custom-snack-bar.component';

@Injectable()
export class SnackbarService {
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';
    private durationInSeconds = 5;

    constructor(
        private _snackBar: MatSnackBar
    ) { }

    openSnackBar(message: string, type: 'success' | 'warning'): void {
        this._snackBar.openFromComponent(CustomSnackBarComponent, {
            panelClass: type,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
            data: {
                message: message,
                icon: type === 'success' ? 'check_circle' : 'error'
            }
        });
    }

}
