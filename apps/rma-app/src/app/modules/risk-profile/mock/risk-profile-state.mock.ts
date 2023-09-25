import { CustomerStatusResponse, IRiskProfileDataRequest, IRiskProfileDataResponse, RPQTnxReq, RPQTnxResponse } from "../models/risk-inquiry-detail.model";
import { RiskProfileState } from "../models/risk-profile-state.model";
import { IActivatedApprovalLinkResponse, ICustomerMobileResponse, IRiskProfileSummaryResponse } from "../models/risk-profile-summary.model";


export const RiskProfileInitailState: RiskProfileState = {
    riskProfileInquiryData: {} as IRiskProfileDataResponse,
    riskProfileInquiryDataRequest: {} as IRiskProfileDataRequest,
    riskProfileSummaryData: {} as IRiskProfileSummaryResponse,
    activatedApprovalLinkData: {} as IActivatedApprovalLinkResponse,
    mobileNumber: {} as ICustomerMobileResponse,
    selectedTransactionId: "",
    updateRiskProfileQuestionnaireRes: {} as RPQTnxResponse,
    updateRiskProfileQuestionnaireReq: {} as RPQTnxReq,
    customerStatus: {} as CustomerStatusResponse
}
