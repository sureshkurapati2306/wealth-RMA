import { ISalesChargeDropDowmRequest, ISalesChargeDropDowmResponse } from "../models/sales-charge.model";

export const MockSalesChargeResponse: ISalesChargeDropDowmResponse[] = [
    {
      scId: "default",
      scName: "Default sales charge",
      rate: 3
    },
    {
      scId: "adhoc",
      scName: "Request for adhoc discount",
      minRate: 1.48,
      maxRate: 2.49
    },
    {
        scId: 'dummy',
        scName: 'dummy',
    }
]

export const MockSalesChargeRequest: ISalesChargeDropDowmRequest = {
    invAcctNo: "123",
    bulkAmt: 1230,
    grossAmt: 1230,
    fundCode: 'ABCD'
}

