import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { BACK_OFFICE_COMPONENTS, MintOfficeFeatureLoginRoutingModule } from './mint-office-feature-login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [BACK_OFFICE_COMPONENTS],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        CommonModule,
        MatIconModule,
        MintOfficeFeatureLoginRoutingModule,
        StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
        EffectsModule.forFeature([AuthEffects]),
    ],
})
export class MintOfficeFeatureLoginModule {}
