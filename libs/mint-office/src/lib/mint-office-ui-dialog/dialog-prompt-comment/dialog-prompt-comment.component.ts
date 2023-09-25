import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: string;
  icon: string;
  description: string;
  textareaLabel: string;
  textareaPlaceholer: string;
  btnOkLabel: string;
  btnCancelLabel: string;
}

@Component({
  selector: 'cimb-office-dialog-prompt-comment',
  templateUrl: './dialog-prompt-comment.component.html',
  styleUrls: ['./dialog-prompt-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogPromptCommentComponent {

  //Default values
  dialogData: DialogData = {
    title: 'Dialog title',
    icon: 'icon-danger-1',
    description: '<p>Dialog descriptions.</p>',
    textareaLabel: 'Comments',
    textareaPlaceholer: 'Enter your comments here.',
    btnOkLabel: 'Confirm',
    btnCancelLabel: 'Cancel',
  };

  comments = '';
  maxCharacterLength = 500;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Partial<DialogData>,
    public dialogRef: MatDialogRef<DialogPromptCommentComponent>,
  ) {
    this.dialogData = {
      ...this.dialogData,
      ...data
    }
  }

  clickOk(): void {
    this.dialogRef.close({
      result: 'ok',
      comments: this.comments
    });
  }

}

