import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationStatusTableComponent } from './application-status-table/application-status-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTransaction from './+state/transaction.reducer';
import { TransactionEffects } from './+state/transaction.effects';
import { CustomerHoldingComponent } from './customer-holding/customer-holding.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    declarations: [
        ApplicationStatusTableComponent,
        CustomerHoldingComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule,
        MatCheckboxModule,
        MatTableModule,
        MatSortModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatDialogModule,
        MatRadioModule,
        StoreModule.forFeature(fromTransaction.TRANSACTION_FEATURE_KEY, fromTransaction.transactionReducer),
        EffectsModule.forFeature([TransactionEffects]),
    ],
    exports: [
        ApplicationStatusTableComponent,
        CustomerHoldingComponent
    ]
})
export class MintOfficeTableModule { }
