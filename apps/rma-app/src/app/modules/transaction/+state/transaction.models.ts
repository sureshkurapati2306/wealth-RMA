import { ISettlementAccount , InvestmentAccount } from "@cimb/mint-office";
import { FundDetail, FundRequestData } from "../models/funds.model";
import { IRmaTransactionDetail } from "../models/risk-profile.model";

export interface ITransactionReq {
    rmId: string | number;
    year: number;
}
export interface IDetailFundData {
    nav: number;
    unitsHeld: number;
    returns: number;
    totalInvested: number;
    fundIndicator: string;
    assetClass: string;
    riskRating: string;
    minInitialSubscription: number;
    maxInitialSubscription: number;
    minSubsequentSubscription: number;
    maxSubsequentSubscription: number;
    minHolding: number;
}

export interface ISearchFundData {
    fundId: number;
    fundCode: string;
    fundName: string;
    fundStatus: string;
    customerHolding?: number;
    focusFund?: number;
    closeEnded?: number;
    wholeSale?: number;
    details?: FundDetail,
    subscribeFundDetails?: IRmaTransactionDetail;
}
export interface IFundDataResponse {
    fundData: ISearchFundData[];
}
export interface IFundDetailsResponse {
    fundDetail: IDetailFundData[];
}
export interface IFundDetailsRequest {
    nav: number;
    unitsHeld: number;
    returns: number;
    totalInvested: number;
    fundIndicator: string;
    assetClass: string;
    riskRating: string;
    minInitialSubscription: number;
    maxInitialSubscription: number;
    minSubsequentSubscription: number;
    maxSubsequentSubscription: number;
    minHolding: number;
}
export interface IFundDataRequest {
    fundName: string;
    cifNumber: string;
    accountNo?: string[];
    riskCategory?: string[];
    assetClass?: string[];
    fundType?: string[];
    fundCurrency?: string[],
    transactionType?: string;
    isActiveCustomerHoldings?: boolean;
}

export interface IDetailFundDataRequest {
    nav: number;
    unitsHeld: number;
    returns: number;
    totalInvested: number;
    fundIndicator: string;
    assetClass: string;
    riskRating: string;
    minInitialSubscription: number;
    maxInitialSubscription: number;
    minSubsequentSubscription: number;
    maxSubsequentSubscription: number;
    minHolding: number;
}

export interface Branch {
    branchCode: string;
    branchName: string;
}

export interface SettlementAccount {
    bankAccounts: [];
    branchCode: string;
}
export interface IPastPerformanceResponse {
    month: number;
    pastPerformance: number;
}
export interface IPerformanceChart {
    fundCode: string;
    month: number;
}

export interface ITransactionAppRequest {
    [key: string | symbol]: any;
    trxId?: number,
    rmId: string,
    sibsCif: string,
    customerName: string,
    productType: string,
    transactionType: string,
    investAccountNo: string | InvestmentAccount,
    settlementAccountNo: string,
    dTotalTransactionAmount: number,
    approverId: number,
    requestUid: string,
    salesBranch: string,
    staffBranch: string,
    acknowledgement: string,
    remarks?: string,
    referralCode?: string,
    referralName?: string,
    referralBranch?: string,
    currencyCode?: string,
    fund: FundRequestData[]
}

export interface IGetTransactionIdRequest {
    trxId: number;
}

export interface ITransactionAppResponse {
    status: string,
    message: string,
    id: string,
    transactionRefId: string,
    transactionCreateDate: string
}

export interface IDraftTransactionResponse {
    status: string,
    message: string,
    trxId: string,
    transactionRefId: string,
    transactionCreateDate: string,
    draftExpiryDate: string
}

export interface IFundRequestData {
    totalAmount: number,
    currencyCode: string,
    fundCode: string,
    salesChargeId: string,
    salesChargeRate: number,
    salesChargeAmount: number,
    remark: string
}

export interface IproductTransactionForm {
    rmId: string,
    sibsCif: string,
    customerName: string,
    productType: string,
    transactionType: string,
    investAccountNo: string ,
    settlementAccountNo: string ,
    dTotalTransactionAmount: number,
    approverId: number,
    requestUid: string,
}

export interface ISalesFormData {
    salesBranch: string,
    staffBranch: string
}

export interface IRefferalTransactionForm {
    remarks: string,
    referralCode: string,
    referralName: string,
    referralBranch: string
}

export interface IRefferalTransactionRequest {
    formData: IRefferalTransactionForm,
    isDirty?: boolean
}

export interface IProductTransactionRequest {
    isValid: boolean,
    isDirty?: boolean,
    formData: IproductTransactionForm | null
}

export interface IAcknowledgeForm {
    isValid: boolean,
    isDirty?: boolean
}

export interface ISalesFormDataRequest {
    isValid: boolean,
    isDirty?: boolean,
    formData: ISalesFormData | null
}

export interface IDeleteDraftResponse {
    message: string,
    data: string,
    success: boolean
}

export interface ITotalFundAmount{
    totalAmount: string;
    salesChargeAmountTotal: string;
    netinvestedAmountToal: string;
}

export interface INonDefaultAccount {
    investAccountNo: string;
    settlementAccountNo: string;
    cif?: string
}

export interface INonDefaultAccountResponse {
    nonDefaultSettlement: number;
}

export interface IRegionalDirectorForm{
    isValid: boolean;
    isDirty: boolean;
}
