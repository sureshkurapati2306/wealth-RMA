import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
    title: string;
    icon: string;
    description: string;
    btnOkLabel: string;
    btnCancelLabel: string;
}

@Component({
    selector: 'cimb-office-logout-dialog',
    templateUrl: './logout-dialog.component.html',
    styleUrls: ['./logout-dialog.component.scss'],
})
export class LogoutDialogComponent {
    //Default values
    dialogData: DialogData = {
        title: 'Dialog title',
        icon: 'icon-danger-1',
        description: '<p>Dialog descriptions.</p>',
        btnOkLabel: 'OK',
        btnCancelLabel: 'Cancel',
    };

    constructor(
        @Inject(MAT_DIALOG_DATA) data: Partial<DialogData>,

        public dialogRef: MatDialogRef<LogoutDialogComponent>,
    ) {
        this.dialogData = {
            ...this.dialogData,
            ...data,
        };
    }

    proceed(): void {
        this.dialogRef.close(this.dialogData.btnOkLabel);
    }
    cancel(): void {
        this.dialogRef.close(this.dialogData.btnCancelLabel);
    }
}
