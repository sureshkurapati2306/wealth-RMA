/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { RiskProfileInitailState } from "../mock/risk-profile-state.mock";
import { riskProfileReducer } from "./risk-profile.reducer";
import * as RiskProfileAction from './risk-profile.action';
import { MockIRiskProfileDataRequest, MockIRiskProfileDataResponse } from "../mock/risk-profile-spec.mock";
import { MockIActivatedApprovalLinkResponse, MockIRiskProfileSummaryRequest, MockIRiskProfileSummaryResponse, MockIRiskProfileUpdateMobileNoRequest, MockIRiskProfileUpdateMobileNoRes, MockUpdateRiskProfileQuestionnaireRequest, MockUpdateRiskProfileQuestionnaireResponse } from "../mock/risk-profile-summary-spec.mock";
import { RiskProfileState } from "../models/risk-profile-state.model";

describe('Risk Profile Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {};

            const result = riskProfileReducer(RiskProfileInitailState, action as any);

            expect(result).toBe(RiskProfileInitailState);
        });
    });
});

describe('Risk profile inquiry data', () => {
    it('should start to load data from API', () => {
        const action = RiskProfileAction.getRiskProfileInquiryDetail({
            data: MockIRiskProfileDataRequest
        });

        const result = riskProfileReducer(RiskProfileInitailState, action as any);

        expect(result.riskProfileInquiryDataRequest).toEqual(MockIRiskProfileDataRequest);
    });

    it('should successfully load data from API', () => {
        const action = RiskProfileAction.getRiskProfileInqiryDetailSuccess({
            data: MockIRiskProfileDataResponse
        });

        const result = riskProfileReducer(RiskProfileInitailState, action as any);

        expect(result.riskProfileInquiryData).toEqual(MockIRiskProfileDataResponse);
    });

    it('should successfully set transaction id', () => {
        const action = RiskProfileAction.getRiskProfileSummary({
            data: MockIRiskProfileSummaryRequest
        });

        const result = riskProfileReducer(RiskProfileInitailState, action as any);

        expect(result.selectedTransactionId).toEqual(MockIRiskProfileSummaryRequest.transactionId);
    });

    it('should successfully get mobile no from API', () => {
        const action = RiskProfileAction.getRiskProfileMobileNoSuccess({
            data: MockIRiskProfileUpdateMobileNoRequest
        });

        const result = riskProfileReducer(RiskProfileInitailState, action as any);

        expect(result.mobileNumber).toEqual(MockIRiskProfileUpdateMobileNoRequest);
    });

    it('should successfully get profile summary from API', () => {
        const action = RiskProfileAction.getRiskProfileSummarySuccess({
            data: MockIRiskProfileSummaryResponse
        });

        const result = riskProfileReducer(RiskProfileInitailState, action as any);

        expect(result.riskProfileSummaryData).toEqual(MockIRiskProfileSummaryResponse);
    });

    it('should successfully get mobile number from API', () => {
        const action = RiskProfileAction.getRiskProfileMobileNoSuccess({
            data: MockIRiskProfileUpdateMobileNoRes
        });

        const result = riskProfileReducer(RiskProfileInitailState, action as any);

        expect(result.mobileNumber).toEqual(MockIRiskProfileUpdateMobileNoRes);
    });

    it('should successfully update Activated Approval Link  from API', () => {
        const action = RiskProfileAction.updateActivatedApprovalLinkSuccess({
            data: MockIActivatedApprovalLinkResponse
        });

        const mockInitState:RiskProfileState  = RiskProfileInitailState;
        mockInitState.riskProfileSummaryData = {
            cif : '1234',
            customerApprovalStatus : 'I',
            RPQuestionaire: [],
            createdOn: '28-9-2022',
            approvalLinkUrl: 'https://www.cimbonboard.my/refId=13911293-1813-4a9a-94e0-28879bc91ed9',
            approvalLinkStatus: 'P'
        }

        const result = riskProfileReducer(mockInitState, action as any);

        expect(result.activatedApprovalLinkData).toEqual(MockIActivatedApprovalLinkResponse);
        expect(result.riskProfileSummaryData.cif).toEqual('1234')

    });

    it('should successfully get updateRiskProfileQuestionnaire Request for API', () => {
        const action = RiskProfileAction.updateRiskProfileQuestionnaireReq({
            data: MockUpdateRiskProfileQuestionnaireRequest
        });

        const result = riskProfileReducer(RiskProfileInitailState, action as any);

        expect(result.updateRiskProfileQuestionnaireReq).toEqual(MockUpdateRiskProfileQuestionnaireRequest);
    });

    it('should get successfully updateRiskProfileQuestionnaire Response', () => {
        const action = RiskProfileAction.updateRiskProfileQuestionnaireRes({
            data: MockUpdateRiskProfileQuestionnaireResponse
        });

        const mockInitState:RiskProfileState  = RiskProfileInitailState;
        mockInitState.updateRiskProfileQuestionnaireRes = {
            message: "test",
            status: 200,
            transactionReferenceId: "test-1",
            trxId: 10
        }

        const result = riskProfileReducer(mockInitState, action as any);

        expect(result.updateRiskProfileQuestionnaireRes).toEqual(MockUpdateRiskProfileQuestionnaireResponse);
        expect(result.updateRiskProfileQuestionnaireRes.trxId).toEqual(10)

    });
});
