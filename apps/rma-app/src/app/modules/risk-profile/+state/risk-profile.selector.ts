import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RiskProfileState } from '../models/risk-profile-state.model';

export const RISK_PROFILE_STATE_NAME = 'riskProfile';

const getRiskProfileState = createFeatureSelector<RiskProfileState>(RISK_PROFILE_STATE_NAME);

export const riskProfileDataResponse = createSelector(getRiskProfileState, (state) => {
    if (state) {
        return state.riskProfileInquiryData ? state.riskProfileInquiryData : null;
    }
    return null
});

export const riskProfileSummaryResponse = createSelector(getRiskProfileState, (state) => {
    if (state) {
        return state.riskProfileSummaryData ? state.riskProfileSummaryData : null;
    }
    return null
});

export const activatedApprovalLinkResponse = createSelector(getRiskProfileState, (state) => {
    if (state) {
        return state.activatedApprovalLinkData ? state.activatedApprovalLinkData : null;
    }
    return null
});

export const riskProfileMobileNoResponse = createSelector(getRiskProfileState, (state) => {
    if (state) {
        return state.mobileNumber ? state.mobileNumber : null;
    }
    return null
});

export const riskProfileSelectedTransactionId = createSelector(getRiskProfileState, (state) => {
    if (state) {
        return state.selectedTransactionId ? state.selectedTransactionId : null;
    }
    return null
});

export const updateRiskProfileQuestionnaire = createSelector(getRiskProfileState, (state) => {
    if (state) {
        return state.updateRiskProfileQuestionnaireRes ? state.updateRiskProfileQuestionnaireRes : null;
    }
    return null
});

export const getCustomerStatus = createSelector(getRiskProfileState, (state) => {
    if (state) {
        return state.customerStatus ? state.customerStatus : null;
    }
    return null
});
