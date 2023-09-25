import { IRiskProfileDataRequest, IRiskProfileDataResponse, RPQTnxReq, RPQTnxResponse, CustomerStatusResponse } from "./risk-inquiry-detail.model";
import { IActivatedApprovalLinkResponse, IRiskProfileSummaryResponse, ICustomerMobileResponse } from './risk-profile-summary.model';

export interface RiskProfileState {
    riskProfileInquiryDataRequest: IRiskProfileDataRequest
    riskProfileInquiryData: IRiskProfileDataResponse;
    riskProfileSummaryData: IRiskProfileSummaryResponse;
    activatedApprovalLinkData: IActivatedApprovalLinkResponse;
    mobileNumber: ICustomerMobileResponse;
    selectedTransactionId: string;
    updateRiskProfileQuestionnaireRes: RPQTnxResponse,
    updateRiskProfileQuestionnaireReq: RPQTnxReq,
    customerStatus: CustomerStatusResponse
}
