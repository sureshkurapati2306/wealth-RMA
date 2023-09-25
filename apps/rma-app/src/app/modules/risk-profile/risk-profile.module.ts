import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskProfileComponent } from './risk-profile.component';
import { RiskProfileRoutingModule } from './risk-profile-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RiskProfileEditComponent } from './components/risk-profile-edit/risk-profile-edit.component';
import { RiskProfileDetailComponent } from './components/risk-profile-detail/risk-profile-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RiskProfileSummaryComponent } from './components/risk-profile-summary/risk-profile-summary.component';
import { RiskProfileService } from './services/risk-profile.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { riskProfileReducer, RISK_PROFILE_FEATURE_KEY } from './+state/risk-profile.reducer';
import { RiskProfileEffect } from './+state/risk-profile.effect';
import { CimbCommonModule } from '@cimb/common';
import { components } from './components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RiskProfileComponent,
    RiskProfileEditComponent,
    RiskProfileDetailComponent,
    RiskProfileSummaryComponent,
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    RiskProfileRoutingModule,
    CimbCommonModule,
    StoreModule.forFeature(RISK_PROFILE_FEATURE_KEY, riskProfileReducer),
    EffectsModule.forFeature([RiskProfileEffect]),
  ],
  providers: [
    RiskProfileService
  ]
})
export class RiskProfileModule { }
