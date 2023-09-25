export interface ISalesChargeDropDowmRequest {
    invAcctNo: string,
    bulkAmt: number,
    fundCode: string,
    grossAmt: number
}

export interface ISalesChargeDropDowmResponse {
    scId: string,
    scName: string,
    rate?: number
    minRate?: number
    maxRate?: number
}
