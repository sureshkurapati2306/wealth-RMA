/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IDashboardState } from './dashboard.models';
import { DASHBOARD_FEATURE_KEY } from './dashboard.reducer';


const getDashBoardState = createFeatureSelector<IDashboardState>(
  DASHBOARD_FEATURE_KEY
);
export const monthToDate = createSelector(getDashBoardState, (state) => {
    return state.transaction?.monthToDate ? state.transaction?.monthToDate : null
  }
);

export const yearToDate = createSelector(getDashBoardState, (state) => {
    return state.transaction?.yearToDate[0] ? state.transaction?.yearToDate[0] : null
  }
);

export const getRmDetailsResponse = createSelector(getDashBoardState, (state) => state?.rmDetails ? state?.rmDetails : null);


