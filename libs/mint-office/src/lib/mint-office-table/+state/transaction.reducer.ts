import { createReducer, on } from '@ngrx/store';
import { TransactionDataRequestDTO, TransactionDataResponseDTO } from '../models/application-status.model';
import { InvestmentTransaction, ITransactionList } from '../models/customer-holding.model';

import * as TransactionActions from './transaction.action';

export const TRANSACTION_FEATURE_KEY = 'transaction';

export interface State {
    applicationStatus: {
        request: TransactionDataRequestDTO | null;
        response: TransactionDataResponseDTO | null;
        errorMessage: string | null;
    },
    applicationHolding: {
        request: InvestmentTransaction | null;
        response: ITransactionList | null;
        errorMessage: string | null;
    }
}

export const initialState: State = {
    applicationStatus: {
        request: null,
        response: null,
        errorMessage: '',
    },
    applicationHolding: {
        request: null,
        response: null,
        errorMessage: '',
    }
  };

export const transactionReducer = createReducer(
    initialState,

    on(TransactionActions.transactionStart, (state, action) => {
        return {
            ...state,
            applicationStatus: {...state.applicationStatus, request: action.data},
        };
    }),

    on(TransactionActions.transactionSuccess, (state, action) => {
        return {
            ...state,
            applicationStatus: {...state.applicationStatus, response: action.data},
        };
    }),

    on(TransactionActions.transactionFailure, (state, action) => {
        return {
            ...state,
            applicationStatus: {...state.applicationStatus, errorMessage: action.data},
        };
    }),

    on(TransactionActions.getInvestmentTransaction, (state, action) => {
        return {
            ...state,
            applicationHolding: {...state.applicationHolding, request: action.data},
        };
    }),

    on(TransactionActions.investmentTransactionSuccess, (state, action) => {
        const obj =  {
            ...state,
            applicationHolding: {...state.applicationHolding, response: action.data},
        };
        return obj as State
    }),

    on(TransactionActions.investmentTransactionError, (state, action) => {
        return {
            ...state,
            applicationHolding: {...state.applicationHolding, errorMessage: action.data},
        };
    })
);
