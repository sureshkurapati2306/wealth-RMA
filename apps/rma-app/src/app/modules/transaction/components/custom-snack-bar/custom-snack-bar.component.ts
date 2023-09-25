import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface SnackBarData {
    message: string;
    icon: string;
}

@Component({
  selector: 'cimb-office-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html'
})
export class CustomSnackBarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData,
    public _snackRef: MatSnackBarRef<CustomSnackBarComponent>
  ) { }

}
