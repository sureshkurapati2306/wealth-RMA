import { IGetOrderSummary, SendRemainder } from "../../risk-profile/models/risk-profile-summary.model"

export interface OrderSummaryInitState {
    orderSummary: IGetOrderSummary,
    sendRemainder: SendRemainder
}

export const orderSummaryInitState: OrderSummaryInitState = {
    orderSummary: {} as IGetOrderSummary,
    sendRemainder: {} as SendRemainder
}
