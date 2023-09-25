import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MintOfficeDashboardRoutingModule } from './dashboard-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChartComponent } from './components/chart/chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardEffects } from './+state/dashboard.effects';
import { MatDividerModule } from '@angular/material/divider';
import { NewAccountSearchCustomerComponent } from './components/new-account-search-customer/new-account-search-customer.component';
import { CustomerSearchBarComponent } from './components/customer-search-bar/customer-search-bar.component';
import * as DashboardReducer from './+state/dashboard.reducer'
import { SharedModule } from '../shared/shared.module';
import { MintOfficeTableModule } from '@cimb/mint-office';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ChartComponent,
    NewAccountSearchCustomerComponent,
    CustomerSearchBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    GoogleChartsModule,
    MintOfficeDashboardRoutingModule,
    MatAutocompleteModule,
    MintOfficeTableModule,
    SharedModule,
    StoreModule.forFeature(DashboardReducer.DASHBOARD_FEATURE_KEY, DashboardReducer.transactionReducer),
    EffectsModule.forFeature([DashboardEffects]),
    MatAutocompleteModule
  ]
})
export class DashboardModule { }
