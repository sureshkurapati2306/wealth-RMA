import { createReducer, on } from "@ngrx/store";
import { customerInitialState } from "../mock/customer-state.mock";
import * as CustomerAction from './customer.action';

export const CUSTOMER_FEATURE_KEY = 'customer';

export const customerReducer = createReducer(
    customerInitialState,

    on(CustomerAction.getRiskProfileInquiry, (state, action) => {
        return {
            ...state,
            riskProfileRequest: action.data
        }
    }),

    on(CustomerAction.getRiskProfileInqirySuccess, (state, action) => {
        return {
            ...state,
            riskProfileResponse: action.data
        }
    }),

    on(CustomerAction.getRiskProfileInqiryFailure, (state, action) => {
        return {
            ...state,
            riskProfileError: action.data
        }
    }),

    on(CustomerAction.customer, (state, action) => {
        return {
            ...state,
            customer: action.data
        }
    }),

    on(CustomerAction.coustomerInvestmentSucess, (state, action) => {
        return {
            ...state,
            customerInvestment: action.data
        }
    }),

    on(CustomerAction.updateCustomerEmail, (state,action)=> {
        return {
            ...state,
            updateCustomerEmail: action.payload
        }
    }),

    on(CustomerAction.getSettingsParamSuccess, (state,action)=> {
        return {
            ...state,
            getSettingsParam: action.data
        }
    })

)
