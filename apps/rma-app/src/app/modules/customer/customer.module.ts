import { RiskProfileModule } from './../risk-profile/risk-profile.module';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './components/profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RiskProfileComponent } from './components/risk-profile/risk-profile.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { TotalPortfolioComponent } from './components/total-portfolio/total-portfolio.component';
import { CustomerChartComponent } from './components/customer-chart/customer-chart.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GoogleChartsModule } from 'angular-google-charts';
import { HomeComponent } from './components/home/home.component';
import { AppStatusComponent } from './components/app-status/app-status.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { customerReducer, CUSTOMER_FEATURE_KEY } from './+state/customer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffect } from './+state/customer.effect';
import { CustomerService } from './services/customer.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerRoutingModule } from './customer-routing.module';
import { DecimalPipe } from '@angular/common';
import { MintOfficeTableModule } from '@cimb/mint-office';
import { SnackbarService } from '../transaction/services/snack-bar.service';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ProfileComponent,
    RiskProfileComponent,
    CustomerDetailsComponent,
    TotalPortfolioComponent,
    CustomerChartComponent,
    HomeComponent,
    AppStatusComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatGridListModule,
    MatSortModule,
    GoogleChartsModule,
    MatIconModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatCardModule,
    CustomerRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MintOfficeTableModule,
    RiskProfileModule,
    SharedModule,
    StoreModule.forFeature(CUSTOMER_FEATURE_KEY, customerReducer),
    EffectsModule.forFeature([CustomerEffect]),
  ],
  providers: [
    CustomerService,
    SnackbarService,
    DecimalPipe,
    {
        provide: MatDialogRef,
        useValue: null
    }
  ]
})
export class CustomerModule { }
