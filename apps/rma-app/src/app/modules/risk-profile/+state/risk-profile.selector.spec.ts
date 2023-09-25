
import { MockIRiskProfileDataResponse } from '../mock/risk-profile-spec.mock';
import { RiskProfileInitailState } from '../mock/risk-profile-state.mock';
import { MockIActivatedApprovalLinkResponse, MockIRiskProfileSummaryRequest, MockIRiskProfileSummaryResponse, MockIRiskProfileUpdateMobileNoRes, MockUpdateRiskProfileQuestionnaireResponse, MockGetCustomerStatus } from '../mock/risk-profile-summary-spec.mock';
import * as RiskProfileSelector from './risk-profile.selector';

describe('Auth Selectors', () => {
    it('should check if we have the responseDTO', () => {
        const result = RiskProfileSelector.riskProfileDataResponse.projector({...RiskProfileInitailState, riskProfileInquiryData: MockIRiskProfileDataResponse});

        expect(result).toBeTruthy();
    });

    it('should check if we have the mobileNumber', () => {
        const result = RiskProfileSelector.riskProfileMobileNoResponse.projector({...RiskProfileInitailState, mobileNumber: MockIRiskProfileUpdateMobileNoRes.mobileNumber});

        expect(result).toBeTruthy();
    });

    it('should check if we have the riskProfileSummaryData', () => {
        const result = RiskProfileSelector.riskProfileSummaryResponse.projector({...RiskProfileInitailState, riskProfileSummaryData: MockIRiskProfileSummaryResponse});

        expect(result).toBeTruthy();
    });

    it('should check if we have the activatedApprovalLinkResponse', () => {
        const result = RiskProfileSelector.activatedApprovalLinkResponse.projector({...RiskProfileInitailState, activatedApprovalLinkData: MockIActivatedApprovalLinkResponse});

        expect(result).toBeTruthy();
    });

    it('should check if we have the riskProfileSelectedTransactionId', () => {
        const result = RiskProfileSelector.riskProfileSelectedTransactionId.projector({...RiskProfileInitailState, selectedTransactionId: MockIRiskProfileSummaryRequest});

        expect(result).toBeTruthy();
    });

    it('should check if we have the updateRiskProfileQuestionnaire', () => {
        const result = RiskProfileSelector.updateRiskProfileQuestionnaire.projector({...RiskProfileInitailState, updateRiskProfileQuestionnaireRes: MockUpdateRiskProfileQuestionnaireResponse});

        expect(result).toBeTruthy();
    });
    
    it('should check if we have the getCustomerStatus', () => {
        const result = RiskProfileSelector.getCustomerStatus.projector({...RiskProfileInitailState, customerStatus: MockGetCustomerStatus});

        expect(result).toBeTruthy();
    });
});
