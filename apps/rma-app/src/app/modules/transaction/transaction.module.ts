import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RmFundsComponent } from './components/rm-funds/rm-funds.component';
import { RmProductTransactionComponent } from './components/rm-product-transaction/rm-product-transaction.component';
import { RmSalesComponent } from './components/rm-sales/rm-sales.component';
import { RmAcknowledgementComponent } from './components/rm-acknowledgement/rm-acknowledgement.component';
import { RmSearchFilterComponent } from './components/rm-search-filter/rm-search-filter.component';
import { RmSearchFundsComponent } from './components/rm-search-funds/rm-search-funds.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TransactionEffects } from './+state/transaction.effects';
import * as fromTransactionSearch from './+state/transaction.reducer';
import { FundDetailDisclaimerComponent } from './components/fund-detail-disclaimer/fund-detail-disclaimer.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { FundCardComponent } from './components/fund-card/fund-card.component';
import { CoreModule } from '@cimb/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from './services/snack-bar.service';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';
import { AdhocApprovalComponent } from './components/adhoc-approval/adhoc-approval.component';
import { CoreModule as MintOfficeModule } from '@cimb/mint-office';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { SharedModule } from '../shared/shared.module';
import { FundDocumentComponent } from './components/fund-document/fund-document.component';
import { FundInvestmentDetailComponent } from './components/fund-investment-detail/fund-investment-detail.component';
import { PastPerformanceComponent } from './components/past-performance/past-performance.component';
import { RmChartFundPerformanceComponent } from './components/rm-chart-fund-performance/rm-chart-fund-performance.component';
import { FundDetailDialogComponent } from './components/fund-detail-dialog/fund-detail-dialog.component';

@NgModule({
    declarations: [
        TransactionComponent,
        RmSalesComponent,
        RmFundsComponent,
        RmProductTransactionComponent,
        RmAcknowledgementComponent,
        RmSearchFilterComponent,
        RmSearchFundsComponent,
        PastPerformanceComponent,
        FundDocumentComponent,
        FundDetailDisclaimerComponent,
        FundInvestmentDetailComponent,
        RmChartFundPerformanceComponent,
        FundCardComponent,
        CustomSnackBarComponent,
        AdhocApprovalComponent,
        FundDetailDialogComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        MintOfficeModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatRadioModule,
        MatSelectModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        GoogleChartsModule,
        MatDialogModule,
        MatSnackBarModule,
        TransactionRoutingModule,
        SharedModule,
        StoreModule.forFeature(fromTransactionSearch.TRANSACTION_FEATURE_KEY, fromTransactionSearch.transactionSearchReducer),
        EffectsModule.forFeature([TransactionEffects]),

    ],
    exports :[
        RmSalesComponent,
        RmFundsComponent,
        RmProductTransactionComponent,
        RmAcknowledgementComponent,
        RmSearchFilterComponent,
        RmSearchFundsComponent,
        PastPerformanceComponent,
        FundDocumentComponent,
        FundDetailDisclaimerComponent,
        FundInvestmentDetailComponent,
        RmChartFundPerformanceComponent,
        AdhocApprovalComponent
    ],
    providers: [
        SnackbarService
    ]
})
export class TransactionModule {}
