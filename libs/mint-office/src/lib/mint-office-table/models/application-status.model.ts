export interface TransactionDataRequestDTO {
    rmId: string,
    productType: ProductType,
    customerId: string,
    days: number,
    transactionType: ITransactionType[],
    transactionStatus: ApplicationStatus[],
    pageSize: number,
    pageNo: number,
    sortingFieldsOrder: string[]
}

export interface TransactionDataResponseDTO {
    action: string,
    totalRecords: number,
    pageNo: number,
    pageSize: number,
    rmId: number,
    prdType: ProductType,
    transactions: Transaction[]
}

export interface Transaction {
    id: number,
    customerName: string,
    refId: number,
    creationDate: string,
    applicationStatus: ApplicationStatus,
    transactionType: string,
    rpExpiry: boolean,
    rpqApprovalStatus: string,
}

export interface CategoryFilter {
    riskCategoryType : RiskCategoryType[],
    fundListType: FundListType[],
    currencyType: CurrencyType[]
}

export enum ITransactionType {
    Subscribe = "S",
    Redeem = "R",
    Bundle = "B",
    Switch = "W",
    RPQ_Update = 'Q'
}

export enum ProductType {
    UT = "UT",
    ASNB = "ASNB"
}

export enum ApplicationStatus {
    Draft = "D",
    Pending = "P",
    Confirm = "C",
    Reject = "R",
    Approved = "A",
    Completed= "X",
    Processing = "Y"
}

export enum RiskCategoryType {
    Defensive = "1",
    Conservative = "2",
    Balanced = "3",
    Growth = "4",
    Aggressive  = '5'
}

export enum FundListType {
    Islamic = "I",
    Conventional = "C"
}

export enum CurrencyType {
    Malaysian = "MYR",
    Singapore  = "SGD",
    Unitedstate = "USD",
    British ="GBP",
    Australian ="AUD"
}
