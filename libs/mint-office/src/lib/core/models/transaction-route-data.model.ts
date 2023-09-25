export interface TransactionRouteData {
    cifNumber?: string | null;
    transactionType?: TransactionType | null;
    transactionId?: string | null;
    fundCodes?: string[] | null;
}

export enum TransactionType {
    NEW = 'new',
    SUBSCRIBE = 'Subscribe',
    SWITCH = 'Switch',
    REEDEEM = 'Redeem',
    NEW_ACCOUNT = 'New_Account'
}
