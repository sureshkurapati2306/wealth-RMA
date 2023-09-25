export interface CUSTOMER {
    id: string,
    coustomer: string,
    createdDate: string,
    refID: number,
    status: string,
    type: string,
    gender: string,
    cifNumber: string,
    customerType: CUSTOMER_TYPE
}

export enum CUSTOMER_TYPE {
    ETP = "ETP",
    NTP = "NTP"
}

export interface CustomerProfile {
    rpqApprovalStatus: string,
    inSanctionCountry: string,
    licenseValidity: boolean,
}

export interface CustomerInvestment {
    currency: string,
    investmentAmount: number,
    casaAmount: number,
    fixedDeposit: number,
    creditCard: number,
    loanAndFinance: number
    lastUpdatedDate?: string,
}

export interface IUpdateEmailRequest {
    cif : string,
    email : string
}

export interface GetSettingsParam {
    maxUtAcct: number
}