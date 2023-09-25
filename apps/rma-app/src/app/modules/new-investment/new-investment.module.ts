import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewApplicationComponent } from './components/new-application/new-application.component';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StoreModule } from '@ngrx/store';
import { NEW_INVESTMENT_APPLICATION_FEATURE_KEY, newInvestmentApplicationReducer } from './+state/new-application.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NewApplicationEffect } from './+state/new-application.effects';
import { NewApplicationService } from './services/new-application.service';
import { NewInvestmentRoutingModule } from './new-investment-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    NewApplicationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NewInvestmentRoutingModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    SharedModule,
    StoreModule.forFeature(NEW_INVESTMENT_APPLICATION_FEATURE_KEY, newInvestmentApplicationReducer),
    EffectsModule.forFeature([NewApplicationEffect]),
  ],
  providers: [
    NewApplicationService
  ]
})
export class NewInvestmentModule { }
