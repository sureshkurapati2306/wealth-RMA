export interface ITransactionReq {
    rmId: string;
    year: number | string;
}

export interface IRmDetails {
    rmId: string;
    lanId: string;
    name: string;
    mobileNumber: string;
    branch: string;
    status: string;
    createDate: string;
}

export interface Customer {
    id?: string;
    coustomer: string;
    refID: number;
    gender: string;
    type: string;
    status: string;
    createdDate: string;
    cifNumber?: string;
}

export interface IMonthToDate {
    productType: string;
    month: number;
    year: number;
    totalAmount: number;
    currency: string;
    mom: string;
}

export interface IYearToDate {
    year: number;
    totalAmount: number;
    currency: string;
    lastUpdateAt: string;
    data: YData[];
}

export interface YData {
    month: number;
    totalAmount: number;
}

export interface IMockState {
    monthToDate: IMonthToDate[];
    yearToDate: IYearToDate[];
    rmDetails: IRmDetails;
}

export interface ITransaction {
    monthToDate: IMonthToDate;
    yearToDate: IYearToDate[];
}

export interface IState {
    transactionReducer: ITransactions;
}

export interface IStateRmid {
    transactionReducer: IStateRmDetails;
}
export interface IStateRmDetails {
    rmDetails: IRmDetails;
}
export interface ITransactions {
    transaction: ITransaction;
}

export interface IDashboardState {
    transaction: ITransaction | null;
    rmDetails: IRmDetails | null;
}
