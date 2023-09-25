/* eslint-disable @angular-eslint/component-selector */
import { Component,Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: string;
  icon: string;
  description: string;
  btnOkLabel: string;
}

@Component({
  selector: 'cimb-fund-error-dialog',
  templateUrl: './fund-error-dialog.component.html',
  styleUrls: ['./fund-error-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundErrorDialogComponent {

  dialogData: DialogData = {
    title: 'Dialog title',
    icon: 'icon-danger-1',
    description: '<p>Dialog descriptions.</p>',
    btnOkLabel: 'OK',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Partial<DialogData>,
  ) {
    this.dialogData = {
      ...this.dialogData,
      ...data
    }
  }

}