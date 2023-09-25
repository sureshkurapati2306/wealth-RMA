import * as Selectors from './order-summary.selectors';
import { orderSummaryInitState } from '../mock/order-summary-state.mock';
import { MockOrderSummaryData, MockSendRemainderData } from '../mock/order-summary-spec.mock';

describe('OrderSummary Selectors', () => {
    it('should get orderSummaryResponse', () => {
        const result = Selectors.orderSummaryResponse.projector({ ...orderSummaryInitState, orderSummary: MockOrderSummaryData });
        expect(result).toBeTruthy();
    });
  
    it('should get sendRemainderResponse', () => {
        const result = Selectors.sendRemainderResponse.projector({ ...orderSummaryInitState, sendRemainder: MockSendRemainderData });
        expect(result).toBeTruthy();
    });
  
});
