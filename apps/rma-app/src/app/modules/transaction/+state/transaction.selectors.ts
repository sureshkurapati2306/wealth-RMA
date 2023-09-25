import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  State } from './transaction.reducer';

export const TRANSACTION_STATE_NAME = 'transactionSerachFundFeature';

const getTransactionState = createFeatureSelector<State>(TRANSACTION_STATE_NAME);

export const requestSearchFunds = createSelector(getTransactionState, (state) => {
  /* istanbul ignore else */
  if(state) {
    return state.request ? state.request : null;
  }
  return null;
});

export const transactionFundsResponse = createSelector(getTransactionState, (state) => {
    if(state) {
      return state.fundData ? state.fundData : null;
    }
  return null;
});

export const transactionErrorResponse = createSelector(getTransactionState, (state) => {
  /* istanbul ignore else */
  if(state) {
      return state.errorMessage;
    }
  return null;
});

export const branches = createSelector(getTransactionState, (state) => {
    if(state) {
      return state.branches ? state.branches : null;
    }
    return null;
});

export const subscribeFunds = createSelector(getTransactionState, (state) => {
    if(state) {
        return state.subscribeFunds ? state.subscribeFunds : [];
    }
    return null;
})

export const riskProfileInquiry = createSelector(getTransactionState, (state) => {
    if(state) {
        return state.riskProfileInquiry ? state.riskProfileInquiry : null;
    }
    return null;
});

export const activeApprovers = createSelector(getTransactionState, (state) => {
    if(state) {
        return state.activeApprovers ? state.activeApprovers : [];
    }
    return null;
})

export const productTransactionForm = createSelector(getTransactionState, (state) => {
  if(state) {
      return state.productTransactionFormData ? state.productTransactionFormData : null;
  }
  return null;
})

export const salesForm = createSelector(getTransactionState, (state) => {
  if(state) {
      return state.salesFormData ? state.salesFormData : null;
  }
  return null;
})

export const acknowledgeFormResponse = createSelector(getTransactionState, (state) => {
  if(state) {
      return state.acknowledgeFormData ? state.acknowledgeFormData : null;
  }
  return null;
})

export const refferalFormResponse = createSelector(getTransactionState, (state) => {
  const formData = {
    remarks: '',
    referralCode: '',
    referralName: '',
    referralBranch: ''
  };
  if(state) {
      return state.refferalFormData ? state.refferalFormData : {formData: formData};
  }
  return null;
})

export const createdApplicationStatus = createSelector(getTransactionState, (state) => {
  if(state) {
      return state.createdApplication ? state.createdApplication : null;
  }
  return null;
})

export const savedDraftAppResponse = createSelector(getTransactionState, (state) => {
  if(state) {
      return state.savedDraftResponse ? state.savedDraftResponse : null;
  }
  return null;
})

export const saveDraftErrorResponse = createSelector(getTransactionState, (state) => {
  if(state) {
      return state.saveDraftErrorResponse ? state.saveDraftErrorResponse : null;
  }
  return null;
})

export const deletedDraftResponse = createSelector(getTransactionState, (state) => {
  if(state) {
      return state.deletedDraft ? state.deletedDraft : null;
  }
  return null;
})

export const getSavedDraftDetailsResponse = createSelector(getTransactionState, (state) => {
  if(state) {
      return state.getSavedDraftDetails ? state.getSavedDraftDetails : null;
  }
  return null;
})

export const getSalesChargeDropDowns = createSelector(getTransactionState, (state) => {
    if(state) {
        return state.salesChargeDropDown ? state.salesChargeDropDown : null;
    }
    return null;
})

export const allSwitchOutFunds = createSelector(getTransactionState, (state) => {
    if(state) {
        return state.switchOutFunds ? state.switchOutFunds : null;
    }
    return null;
})

export const switchInFundDeviationStatus = createSelector(getTransactionState, (state) => {
    if(state) {
        return state.switchInDeviation;
    }
    return null;
})

export const totalFundAmount = createSelector(getTransactionState, (state)=> {
  if(state){
    return state.totalFundAmount ? state.totalFundAmount : null
  }
  return null;
})

export const totalTransactionAmount = createSelector(getTransactionState, (state) => {
  if(state){
    return state.totalTransactionAmount
  }
  return undefined;
});

export const gettransactionAmountErrorEnableStatus = createSelector(getTransactionState, (state) => {
  if(state) {
      return state.transactionAmountErrorEnable;
  } 

  return false;
})

export const getSearchFormDirtyCheck = createSelector(getTransactionState, (state) => {
  if(state){
    return state.searchForm
  }
  return false;
});

export const getNonDefaultCasaAccount = createSelector(getTransactionState, (state) => {
  if(state){
    return state.nondefaultAccount
  }
  return null
});

export const regionalDirectorForm = createSelector(getTransactionState, (state) => {
  if(state){
    return state.regionalFormdata
  }
  return null
});