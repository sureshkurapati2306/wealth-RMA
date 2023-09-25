import { createReducer, on } from '@ngrx/store';
import { Customer, CustomerProfile } from '../models/customer.model';
import * as MintOfficeActions from './mint-office.actions';

export const mintOfficeFeatureKey = 'mintOffice';

export interface MintOfficeState {
    cimbFooterClass: string | null;
    customer: Customer | null,
    cifNumber: string | null,
    customerProfile: CustomerProfile | null
}

export const initialState: MintOfficeState = {
    cimbFooterClass: '',
    customer: null,
    cifNumber: null,
    customerProfile: null
};


export const reducer = createReducer(
    initialState,

    on(MintOfficeActions.updateCimbFooterClass, (state, action) => {
        return {
            ...state,
            cimbFooterClass: action.className
        };
    }),

    on(MintOfficeActions.getCoustomer, (state, action) => {
        if(action.cifNumber === state.customer?.cifNumber) return state;

        return {
            ...state,
            cifNumber: action.cifNumber
        }
    }),

    on(MintOfficeActions.customer, (state, action) => {
        return {
            ...state,
            customer: action.data
        }
    }),

    on(MintOfficeActions.customerProfile, (state, action) => {
        return {
            ...state,
            customerProfile: action.data
        }
    }),

    on(MintOfficeActions.resetCustomerState, () => {
        return initialState
    })

);
