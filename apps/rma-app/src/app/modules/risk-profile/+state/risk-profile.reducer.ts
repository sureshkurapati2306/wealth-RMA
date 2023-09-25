import { createReducer, on } from "@ngrx/store";
import { RiskProfileInitailState } from "../mock/risk-profile-state.mock";
import * as RiskProfileAction from './risk-profile.action';

export const RISK_PROFILE_FEATURE_KEY = 'riskProfile';

export const riskProfileReducer = createReducer(
    RiskProfileInitailState,

    on(RiskProfileAction.getRiskProfileInquiryDetail, (state, action) => {
        return {
            ...state,
            riskProfileInquiryDataRequest: action.data
        }
    }),

    on(RiskProfileAction.getRiskProfileInqiryDetailSuccess, (state, action) => {
        return {
            ...state,
            riskProfileInquiryData: action.data
        }
    }),

    on(RiskProfileAction.getRiskProfileMobileNoSuccess, (state, action) => {
        return {
            ...state,
            mobileNumber: action.data
        }
    }),

    on(RiskProfileAction.updateRiskProfileMobileSuccess, (state, action) => {
        return {
            ...state,
            mobileNumber: { mobileNumber: action.data.mobileNumber}
        }
    }),

    on(RiskProfileAction.getRiskProfileSummary, (state, action) => {
        return {
            ...state,
            selectedTransactionId: action.data.transactionId
        }
    }),

    on(RiskProfileAction.getRiskProfileSummarySuccess, (state, action) => {
        return {
            ...state,
            riskProfileSummaryData: action.data
        }
    }),

    on(RiskProfileAction.updateActivatedApprovalLinkSuccess, (state, action) => {
        return {
            ...state,
            activatedApprovalLinkData: action.data,
            riskProfileSummaryData: {
                approvalLinkUrl: action.data.approvalLinkUrl,
                approvalLinkStatus: action.data.approvalLinkUrl.length > 0 ? 'A' : 'I',
                cif: state?.riskProfileSummaryData.cif ? state?.riskProfileSummaryData.cif : "",
                customerApprovalStatus: state?.riskProfileSummaryData.customerApprovalStatus,
                RPQuestionaire: state?.riskProfileSummaryData.RPQuestionaire,
                createdOn: state?.riskProfileSummaryData.createdOn
            }
        }
    }),

    on(RiskProfileAction.updateRiskProfileQuestionnaireReq, (state, action) => {
        return {
            ...state,
            updateRiskProfileQuestionnaireReq: action.data
        }
    }),

    on(RiskProfileAction.updateRiskProfileQuestionnaireRes, (state, action) => {
        return {
            ...state,
            updateRiskProfileQuestionnaireRes: action.data
        }
    }),

    on(RiskProfileAction.getCustomerStatusSuccess, (state, action) => {
        return {
            ...state,
            customerStatus: action.data
        }
    }),
)
