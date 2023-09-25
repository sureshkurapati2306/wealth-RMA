export interface IRiskProfileInquiryRequest {
    cifNumber: number | null,
    custName: string | null,
    custIdType: string | null,
    custIdNo: string | null,
    custIdIssue: string | null
}

export interface IRiskProfileInquiryResponse {
    riskProfileStatus: RiskProfileStatus | null,
    rpResults: string | null,
    riskProfile: RiskProfile | null,
    rpTnC: string | null,
    riskProfileDescription: string | null,
    expectedReturn: number | null,
    standardDeviation: number | null,
    lastUpdatedDate: string | null,
    expiryDate: string | null,
    rmManagerName: string | null,
    rmManagerId: string | null,
    potentialLosses?: string | null;
    potentialReturn?: string | null;
    riskDescription?: string | null;
    riskTolerance?: string | null;
    riskToleranceDescription?: string | null;
    recommendedProducts: IRecomandedProduct[] | null
}

export interface IRecomandedProduct {
    fundName: string,
    fundCode: string,
    currency: string,
    fundRiskProfile: RiskProfile,
    fundCategory: string,
    recommendedAsset: string,
    riskRating: number,
    riskProfile: string
}


export enum RiskProfileStatus {
    VALID = "VALID"
}

export enum RiskProfile {
    BALANCED = "Balanced",
    GROWTH = "Growth",
    CONSERVATIVE = "Conservative"
}

export interface IGetTrxDetailResponse {
    rmId: number,
	trxRefId: string,
	productType: string,
	trxType: string,
	currencyCode: string,
	dTotalTrxAmount: number,
	customerName: string,
	trxStatus: string,
	settlementAccountNumber: string,
	investAccountNumber: string,
	approverId: number
	remarks: string,
	referralBranch: string,
	referralCode: string,
	referralName: string,
	staffBranch: string,
	salesBranch: string,
	acknowledgement: string,
	trxCreateDate: string,
	trxUpdateDate: string
	customerId: string,
    draftExpiryDate:string,
    rmaTransactionDetail: IRmaTransactionDetail[]
}

export interface IRmaTransactionDetail {
    trxDetStatus: string,
    totalAmount: number,
    fundCode: string,
    salesChargeId: string,
    salesChargeRate: number,
    salesChargeAmount?: number,
    remark?: string,
    outUnit?:number,
    switchInFundCode?: string;
}
