/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { MockIActivatedApprovalLinkResponse } from '../../risk-profile/mock/risk-profile-summary-spec.mock';
import { MockOrderSummaryData, MockSendRemainderData } from '../mock/order-summary-spec.mock';
import { orderSummaryInitState } from '../mock/order-summary-state.mock';
import * as OrderSummaryApplicationAction from './order-summary.actions';
import { orderSummaryReducer } from './order-summary.reducer';


describe('New Order summary Application Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {};

            const result = orderSummaryReducer(orderSummaryInitState, action as any);

            expect(result).toBe(orderSummaryInitState);
        });
    });
});

describe('Get order summary api data', () => {
    it('should successfully load data from getOrderSummary API', () => {
        const action = OrderSummaryApplicationAction.getOrderSummaryDataSuccess({
            data: MockOrderSummaryData
        });

        const result = orderSummaryReducer(orderSummaryInitState, action as any);

        expect(result.orderSummary).toEqual(MockOrderSummaryData);
    });

    it('should successfully set data from order ActivatedApprovalLinkSuccess API', () => {
        const action = OrderSummaryApplicationAction.orderActivatedApprovalLinkSuccess({
            data: MockIActivatedApprovalLinkResponse
        });

        const result = orderSummaryReducer(orderSummaryInitState, action as any);

        expect(result.orderSummary.approvalLinkUrl).toEqual(MockIActivatedApprovalLinkResponse.approvalLinkUrl);
    });

    it('should call from sendingRemainderSuccess API', () => {
        const action = OrderSummaryApplicationAction.sendingRemainderSuccess({
            data: MockSendRemainderData
        });

        const result = orderSummaryReducer(orderSummaryInitState, action as any);

        expect(result.sendRemainder).toEqual(MockSendRemainderData);
    });

});
