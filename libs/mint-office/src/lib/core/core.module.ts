import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MintOfficeEffect } from './+state/mint-office.effects';
import * as fromApp from './+state/mint-office.reducer';

@NgModule({

  declarations: [

  ],
  exports: [

  ],
  imports: [
    StoreModule.forFeature(fromApp.mintOfficeFeatureKey, fromApp.reducer),
    EffectsModule.forFeature([MintOfficeEffect]),
  ]
})

export class CoreModule {}
