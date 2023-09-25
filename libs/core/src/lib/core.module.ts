import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pipe } from './pipes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { directives } from './directives';

@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule
    ],
    declarations: [
        ...pipe,
        ...directives,
    ],
    exports: [
        ...pipe,
        ...directives,
        MatSnackBarModule
    ],
})
export class CoreModule {}
