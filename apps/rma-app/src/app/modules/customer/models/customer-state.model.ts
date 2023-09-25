import { IRiskProfileInquiryRequest, IRiskProfileInquiryResponse } from "../../transaction/models/risk-profile.model";
import { CUSTOMER, CustomerInvestment, CustomerProfile, GetSettingsParam, IUpdateEmailRequest } from "./customer.model";

export interface CustomerState {
    riskProfileRequest: IRiskProfileInquiryRequest,
    riskProfileResponse: IRiskProfileInquiryResponse,
    riskProfileError: string,
    customer: CUSTOMER;
    customerProfile: CustomerProfile,
    customerInvestment: CustomerInvestment,
    updateCustomerEmail: IUpdateEmailRequest,
    getSettingsParam: GetSettingsParam
}
