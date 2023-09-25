import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRiskProfileInquiryResponse } from "../../transaction/models/risk-profile.model";
import { CustomerState } from "../models/customer-state.model";
import { CUSTOMER, CustomerInvestment, GetSettingsParam } from "../models/customer.model";

export const CUSTOMER_STATE_NAME = 'customer';

const getCustomerState = createFeatureSelector<CustomerState>(CUSTOMER_STATE_NAME);

export const riskProfileResponse = createSelector(getCustomerState, (state) => {
    if(state) {
      return state.riskProfileResponse ? state.riskProfileResponse : null;
    }
    return {} as IRiskProfileInquiryResponse;
});

export const riskProfileError = createSelector(getCustomerState, (state) => {
    if(state) {
      return state.riskProfileError ? state.riskProfileError : null;
    }
    return "";
});

export const customer = createSelector(getCustomerState, (state) => {
    if(state) {
        return state.customer ? state.customer : null;
    }
    return {} as CUSTOMER
});

export const customerInvestment = createSelector(getCustomerState, (state) => {
    if(state) {
        return state.customerInvestment ? state.customerInvestment : null;
    }
    return {} as CustomerInvestment
});

export const settingsParam = createSelector(getCustomerState, (state) => {
    if(state) {
        return state.getSettingsParam ? state.getSettingsParam : null;
    }
    return {} as GetSettingsParam
});

