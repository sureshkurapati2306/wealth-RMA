export interface IRiskProfileMobileRequest {
    mobileNumber: string;
    cif: string;
}

export interface ICustomerMobileResponse {
    mobileNumber: string;
}

export interface IRiskProfileMobileResponse {
    status: string;
    mobileNumber?: string;
}
export interface IActivatedApprovalLinkRequest {
    transactionId: number;
}

export interface IGetcustomerProfileRequest {
    cif: string;
}

export interface IRiskProfileSummaryRequest {
    transactionId: string;
}

export interface IActivateApprovalLinkRequest {
    id: number
}

export interface IRiskProfileSummaryResponse {
    cif: string;
    approvalLinkStatus: string;
    approvalLinkUrl: string;
    customerApprovalStatus: string;
    createdOn: string;
    RPQuestionaire?: IRPQuestionarie[];
}

export interface IGetOrderSummary {
    cif: string;
    approvalLinkStatus: string;
    approvalLinkUrl: string;
    customerApprovalStatus: string;
    approvalStatus?: string;
    createdOn?:string;
    investmentAccount?:string;
    settlementAccount?:string;
    productType?:string;
    applicationId?:string;
    acknowledgement?:string;
    referral?:string;
    remark?:string;
    salesBranch?:string;
    salesChargeDiscountApprover?:string;
    staffBranch?:string;
    totalIndicativeAmount?:string;
    totalInvestmentAmount?:string;
    totalSalesCharge?:string;
    transactionType?:string;
    custRemark?: string;
    approvalRemark?: string;
    subscriberDtoList?:IsubscriberDtoList [];
    rpExpiry: boolean;
    rpqApprovalStatus: string;
    
}

export interface IActivatedApprovalLinkResponse {
    approvalCodeExpiryDate: string,
    approvalLinkUrl: string
}

export interface IRPQuestionarie {
    questionNumber: number;
    questionDesc: string;
    optionsDesc: string;
    additional: string
}

export interface SendRemainder {
    message: string;
    data: string;
    success: boolean;
}

export interface TrxRefId {
    trxRefId: string;
}
export interface IsubscriberDtoList {
    className: string;
    fundIndicator: string;
    fundName: string;
    investmentAmount: string;
    navPrice: string;
    riskRating: string;
    salesChargeAmount: string;
    salesChargeRate: number;
    navUpdatedDate:string;
}
