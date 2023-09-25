import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { DialogPromptCommentComponent } from './dialog-prompt-comment/dialog-prompt-comment.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { FundErrorDialogComponent } from './fund-error-dialog/fund-error-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DialogPromptCommentComponent,
    DialogMessageComponent,
    LogoutDialogComponent,
    DialogAlertComponent,
    FundErrorDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatButtonToggleModule,
  ],
  exports: [
    DialogPromptCommentComponent,
    DialogMessageComponent,
    LogoutDialogComponent,
    DialogAlertComponent,
    FundErrorDialogComponent
  ],
})
export class MintOfficeUiDialogModule { }
