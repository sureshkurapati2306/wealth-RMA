import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { StoreModule } from '@ngrx/store';
import * as fromLoadingBar from './loading-bar/+state/loading-bar.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    LoadingBarComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(fromLoadingBar.loadingBarFeatureKey, fromLoadingBar.reducer),
  ],
  exports: [
    LoadingBarComponent,
  ]
})
export class MintOfficeUiLoadingIndicatorModule { }
