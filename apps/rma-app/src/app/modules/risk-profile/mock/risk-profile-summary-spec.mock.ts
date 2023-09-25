import { RPQTnxResponse, RPQTnxReq, CustomerStatusResponse } from "../models/risk-inquiry-detail.model";
import { IGetcustomerProfileRequest, IRiskProfileSummaryRequest, IActivatedApprovalLinkRequest, IRiskProfileMobileRequest, ICustomerMobileResponse, IRiskProfileMobileResponse, IRiskProfileSummaryResponse, IActivatedApprovalLinkResponse, IActivateApprovalLinkRequest } from "../models/risk-profile-summary.model";

export const MockIRiskProfileMobileNoRequest: IGetcustomerProfileRequest = {
    cif: '10280000511312',
};

export const MockIRiskProfileSummaryRequest: IRiskProfileSummaryRequest = {
    transactionId: "1234",
};

export const MockIActivatedApprovalLinkRequest: IActivatedApprovalLinkRequest = {
    transactionId: 1234,
};

export const MockIRiskProfileUpdateMobileNoRequest: IRiskProfileMobileRequest = {
    mobileNumber: '6012 345-6785',
    cif: '10110000311802'
};

export const MockIRiskProfileUpdateMobileNoRes: ICustomerMobileResponse = {
    mobileNumber: '6012 345-6785',
};

export const MockGetMobileNoRequest: IGetcustomerProfileRequest = {
    cif: '10110000311802'
};

export const MockRiskProfileUpadteMobileResponse: IRiskProfileMobileResponse = {
    status: 'Mobile Number updated Successfully',
};

export const MockIRiskProfileSummaryResponse: IRiskProfileSummaryResponse = {
    cif: '10280000511312',
    customerApprovalStatus: 'Pending',
    approvalLinkUrl: 'https://www.cimbonboard.my/nat123456',
    approvalLinkStatus: "I",
    createdOn: "28-09-2022",
    RPQuestionaire: []
}

export const MockIActivatedApprovalLinkResponse: IActivatedApprovalLinkResponse = {
    approvalCodeExpiryDate: "2022-07-30T16:15:49.000+08:00",
    approvalLinkUrl: "https://www.cimbonboard.my/refId=13911293-1813-4a9a-94e0-28879bc91ed9",
}

export const MockIActivateApprovalLinkRequest: IActivateApprovalLinkRequest = {
    id: 28,
}

export const MockUpdateRiskProfileQuestionnaireResponse: RPQTnxResponse = {
    message: "test",
    status: 200,
    transactionReferenceId: "test-1",
    trxId: 10
};

export const MockUpdateRiskProfileQuestionnaireRequest: RPQTnxReq = {
    rmId: "test_rm_id",
    sibsCif: "test_sibs_cif",
    requestUid : "afsdr1234455",
    rpqQuestionAnswerDetail: [
        {
            questionNumber: 1,
            multiSelect: "Y",
            options: [1,2]
        }
    ]
};

export const MockGetCustomerStatus: CustomerStatusResponse = {
    rpqApprovalStatus : "N",
    inSanctionCountry : "N"
}
