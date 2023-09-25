export interface FundDetail {
    nav: number,
    fundName: string;
    fundStatus: string,
    fundId: number,
    fundCode: string;
    unitsHeld: number,
    pledgeUnit: number,
    returns: number,
    navDate?: string,
    totalInvested: number,
    fundIndicator: string,
    assetClass: string,
    riskRating: string,
    minInitialSubscription: number,
    maxInitialSubscription: number,
    minSubsequentSubscription: number,
    maxSubsequentSubscription: number,
    minHolding: number,
    maxRealizationUnit: number,
    minRealizationUnit: number,
    subscribeFlag: string,
    siFlag: string,
    redeemFlag: string,
    switchInFlag: string,
    switchOutFlag: string,
    colorCode?:string
}

export interface FundDetailQueryParam {
    fundCode: string;
    utAccountNumber: number;
}

export interface IFundRequest {
    fundCode: string,
    month: number
}

export interface IFundSummuryDetail {
    assetClass: string,
    navPrice: number,
    navUpdatedDate: string,
    riskName: string,
    fundIndicator: string,
    fundDocument: FundDocument[]
}

export interface FundDocument {
    msId: number,
    msLink: string,
    msUrl: string,
    isActive: string,
    docId: number,
    documentName: string,
}

export interface FundRequestData {
    totalAmount: string | number;
    salesChargeId: string;
    salesChargeRate: string | number;
    salesChargeAmount: string | number;
    remark: string;
    currencyCode: string;
    fundCode: string;
    fundStatus: string;
    units?: string;

    outUnit?: string,
    outAmt?: number,
    switchInFundCode?: string,
    switchInFee?: string,
    exitFee?: string,
    switchFeeWaiver?: string,

    switchAll?: string;
    switchSearchParam?: string;
    redeemAll?: string;
}

export interface FundCardStatus {
    status: string;
    data: FundRequestData
}

export interface APPROVER {
    approverId: number;
    approverName: string;
}


export interface ISwitchOutFundRequest {
    fundName: string,
    fundCode: string,
    cifNumber: string | undefined,
    custName: string | undefined,
    custIdType: string,
    custIdNo: string,
    custIdIssue: string,
    accountNo: string[],
    transactionType?: string
}
