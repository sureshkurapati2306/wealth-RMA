import { createFeatureSelector } from '@ngrx/store';
import * as fromLoadingBar from './loading-bar.reducer';

export const selectLoadingBarState = createFeatureSelector<fromLoadingBar.State>(
  fromLoadingBar.loadingBarFeatureKey
);
