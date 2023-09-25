import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
    title: string;
    icon: string;
    description: string;
    btnOkLabel: string;
    btnCancelLable?: string;
    dialogLeaveButtonText?: string;
}

@Component({
    selector: 'cimb-office-dialog-message',
    templateUrl: './dialog-message.component.html',
    styleUrls: ['./dialog-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogMessageComponent {
    //Default values
    dialogData: DialogData = {
        title: 'Dialog title',
        icon: 'icon-danger-1',
        description: '<p>Dialog descriptions.</p>',
        btnOkLabel: 'OK',
    };

    constructor(
        @Inject(MAT_DIALOG_DATA) data: Partial<DialogData>,
        public dialogRef: MatDialogRef<DialogMessageComponent>,
    ) {
        this.dialogData = {
            ...this.dialogData,
            ...data,
        };
    }

    confirm(): void {
        this.dialogRef.close(this.dialogData.btnOkLabel);
    }

    cancel(): void {
        this.dialogRef.close(this.dialogData.btnCancelLable);
    }

    leave(): void {
        this.dialogRef.close(this.dialogData.dialogLeaveButtonText);
    }
}