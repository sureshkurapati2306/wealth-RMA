import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './transaction.reducer';


export const TRANSACTION_STATE_NAME = 'transaction';

const getTransactionState = createFeatureSelector<State>(TRANSACTION_STATE_NAME);

export const applicationStatusRequestDTO = createSelector(getTransactionState, (state) => {
    if (state) {
        return state.applicationStatus.request ? state.applicationStatus.request : null;
    }
    return null
});

export const applicationStatusResponse = createSelector(getTransactionState, (state) => {
    if (state) {
        return state.applicationStatus.response ? state.applicationStatus.response : null;
    }
    return null
});

export const applicationStatusErrorResponse = createSelector(getTransactionState, (state) => {
    if (state) {
        return state.applicationStatus.errorMessage ? state.applicationStatus.errorMessage : null;
    }
    return null
});

export const applicationHoldingRequestDTO = createSelector(getTransactionState, (state) => {
    if (state) {
        return state.applicationHolding.request ? state.applicationHolding.request : null;
    }
    return null
});

export const applicationHoldingResponse = createSelector(getTransactionState, (state) => {
    if (state) {
        return state.applicationHolding.response ? state.applicationHolding.response : null;
    }
    return null
});

export const applicationHoldingErrorResponse = createSelector(getTransactionState, (state) => {
    if (state) {
        return state.applicationHolding.errorMessage ? state.applicationHolding.errorMessage : null;
    }
    return null
});
