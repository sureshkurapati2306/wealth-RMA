export interface InvestmentTransaction {
    investmentType: string,
    utAccountNo: string | number,
    productType: string,
    pageSize: number,
    pageNo: number,
    sortingFieldsOrder: string[],
}


export interface ITransactionList {
    totalRecords: number,
    pageSize: number,
    pageNo: number,
    funds: ITransactionFunds[]
}

export interface ITransactionFunds {
    fdId: number,
    fundCode: string,
    fundName: string,
    holdingCost: number,
    holdingUnit: number,
    navPrice: number,
    marketValue: number,
    roi: number,
    investDate: string | null,
    fundIndicator: string,
    fundStatus: string,
    switchingIndicator: string,
    pledgeUnit: number,
    redeemFlag?: "Y" | "N",
    subscribeFlag?: "Y" | "N",
    switchInFlag?:  "Y" | "N",
    switchOutFlag?: "Y" | "N",
    minHolding: number,
    minRealizationUnit: number,
    maxRealizationUnit: number
}

export enum IFundStatus {
    inActive = "I",
    active = "A"
}

export interface IState {
    investmentTransaction : IStateTransaction
}

export interface IStateTransaction {
    transaction: ITransactionList
}

export interface ITransactionValidityResponse {
    statusCode: string
}
