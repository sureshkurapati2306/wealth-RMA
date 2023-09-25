import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderSummaryInitState } from '../mock/order-summary-state.mock';

export const ORDER_SUMMARY_STATE = 'orderSummaryState';
export const SEND_REMAINDER_MSG = 'sendRemainderState'

const orderSummaryState = createFeatureSelector<OrderSummaryInitState>(ORDER_SUMMARY_STATE);

export const orderSummaryResponse = createSelector(orderSummaryState, (state) => {
    if (state) {
        return state.orderSummary ? state.orderSummary : null;
    }
    return null
});

export const sendRemainderResponse = createSelector(orderSummaryState, (state) => {
    if (state) {
        return state.sendRemainder ? state.sendRemainder : null
    }
    return null
});
