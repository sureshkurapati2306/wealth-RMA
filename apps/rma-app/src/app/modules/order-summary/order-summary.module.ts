/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrderSummaryEffect } from './+state/order-summary.effects';
import { ORDER_SUMMARY_FEATURE_KEY, orderSummaryReducer } from './+state/order-summary.reducer';
import { OrderSummaryApiService } from './services/order-summary.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { QRCodeModule } from 'angularx-qrcode';
import { TransactionSummaryComponent } from './components/transaction-summary/transaction-summary.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { OrderSummarySwitchComponent } from './components/order-summary-switch/order-summary-switch.component';
import { OrderSummarySubscribeComponent } from './components/order-summary-subscribe/order-summary-subscribe.component';
import { OrderSummaryRedeemComponent } from './components/order-summary-redeem/order-summary-redeem.component';
import { OrderSummaryCommonTableComponent } from './components/order-summary-common-table/order-summary-common-table.component';
import { CimbCommonModule } from '@cimb/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderSummaryComponent } from './order-summary.component';
import { OrderSummaryRoutingModule } from './order-summary-routing.module';
import { RiskProfileModule } from '../risk-profile/risk-profile.module';
import { SnackbarService } from '../transaction/services/snack-bar.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OrderSummaryComponent,
    TransactionSummaryComponent,
    CustomerDetailsComponent,
    OrderSummarySwitchComponent,
    OrderSummarySubscribeComponent,
    OrderSummaryRedeemComponent,
    OrderSummaryCommonTableComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    OrderSummaryRoutingModule,
    RiskProfileModule,
    CimbCommonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
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
    MatChipsModule,
    SharedModule,
    QRCodeModule,
    StoreModule.forFeature(ORDER_SUMMARY_FEATURE_KEY, orderSummaryReducer),
    EffectsModule.forFeature([OrderSummaryEffect]),
  ],
  providers: [
    OrderSummaryApiService,
    SnackbarService
  ]
})
export class OrderSummaryModule { }
