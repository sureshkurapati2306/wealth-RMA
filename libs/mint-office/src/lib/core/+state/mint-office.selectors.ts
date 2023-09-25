import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMintOffice from './mint-office.reducer';

export const selectMintOfficeState = createFeatureSelector<fromMintOffice.MintOfficeState>(
  fromMintOffice.mintOfficeFeatureKey
);

export const getCimbFooterClassName = createSelector(
  selectMintOfficeState,
  state => {
    return state?.cimbFooterClass;
  }
);

export const customer = createSelector(selectMintOfficeState, (state) => {
    if(state) {
        return state?.customer ? state.customer : null;
    }
    return null;
})

export const cifNumber = createSelector(selectMintOfficeState, (state) => {
    if(state) {
        return state?.cifNumber ? state.cifNumber : null;
    }
    return null;

})

export const customerProfile = createSelector(selectMintOfficeState, (state) => {
  if(state) {
      return state?.customerProfile ? state.customerProfile : null;
  }
  return null;

})
