import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import * as OrderSummaryApplicationAction from './order-summary.actions';
import { OrderSummaryApiService } from '../services/order-summary.service';
import { orderSummaryInitState } from '../mock/order-summary-state.mock';
import { Action } from '@ngrx/store';
import { OrderSummaryEffect } from './order-summary.effects';
import { MockOrderSummaryData, MockSendRemainderData } from '../mock/order-summary-spec.mock';
import { MockIActivatedApprovalLinkResponse } from '../../risk-profile/mock/risk-profile-summary-spec.mock';
import { RiskProfileService } from '../../risk-profile/services/risk-profile.service';
import { SnackbarService } from '../../transaction/services/snack-bar.service';

class MockApiService {
  getOrderSummary() { /* mock */ }
  sendingRemainder() { /* mock */ }
}

class MockRiskApiService {
  activateApprovalLink() { /* mock */ }
}

class MockSnackbarService{
  openSnackBar() { /* mock */ }
}
describe('OrderSummaryEffect', () => {
  let actions: Observable<Action>;
  let effects: OrderSummaryEffect;
  let investmentApiService: OrderSummaryApiService;
  let riskProfileService: RiskProfileService;

  const mockError = "test error message";


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OrderSummaryEffect,
        provideMockActions(() => actions),
        provideMockStore({ initialState: orderSummaryInitState }),
        {
          provide: OrderSummaryApiService, useClass: MockApiService
        },
        {
          provide: RiskProfileService, useClass: MockRiskApiService
        },
        {
          provide: SnackbarService, useClass: MockSnackbarService
        }
      ],
    });

    effects = TestBed.inject(OrderSummaryEffect);
    investmentApiService = TestBed.inject(OrderSummaryApiService);
    riskProfileService = TestBed.inject(RiskProfileService);
  });


  it('should be created', () => {
    expect(effects).toBeTruthy();
  });


  it('should fetch getOrderSummary with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getOrderSummary').mockReturnValue(of(MockOrderSummaryData));

    actions = of(OrderSummaryApplicationAction.getOrderSummaryData({
      data: "28"
    }));

    effects.getOrderSummary$
      .subscribe(res => {
        expect(res).toEqual(OrderSummaryApplicationAction.getOrderSummaryDataSuccess({
          data: MockOrderSummaryData
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should fetch postRemaindermassage with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'sendingRemainder').mockReturnValue(of(MockSendRemainderData));

    actions = of(OrderSummaryApplicationAction.sendingRemainder({
      data: { trxRefId: "28" }
    }));

    effects.postRemaindermassage$
      .subscribe(res => {
        expect(res).toEqual(OrderSummaryApplicationAction.sendingRemainderSuccess({
          data: MockSendRemainderData
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should update order Activated Approval Link success status', (done) => {
    const spy = jest.spyOn(riskProfileService, 'activateApprovalLink').mockReturnValue(of(MockIActivatedApprovalLinkResponse));

    actions = of(OrderSummaryApplicationAction.orderActivatedApprovalLink({
      data: {
        transactionId: 1
      }
    }));

    effects.orderActivatedApprovalLink$
      .subscribe(action => {
        expect(action).toEqual(OrderSummaryApplicationAction.orderActivatedApprovalLinkSuccess({
          data: MockIActivatedApprovalLinkResponse
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should call getOrderSummary Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getOrderSummary').mockReturnValue(throwError(mockError));

    actions = of(OrderSummaryApplicationAction.getOrderSummaryData({
      data: "28"
    }));

    effects.getOrderSummary$
      .subscribe(action => {
        expect(action).toEqual(OrderSummaryApplicationAction.getOrderSummaryDataFailure({
          data: mockError
        }));
        expect(spy).toHaveBeenCalledTimes(1);
      });

  });

  it('should call postRemaindermassage Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'sendingRemainder').mockReturnValue(throwError(mockError));

    actions = of(OrderSummaryApplicationAction.sendingRemainder({
      data: { trxRefId: "28" }
    }));

    effects.postRemaindermassage$
      .subscribe(action => {
        expect(action).toEqual(OrderSummaryApplicationAction.sendingRemainderFailure({
          data: mockError
        }));
        expect(spy).toHaveBeenCalledTimes(1);
      });

  });

  it('should call order Activated Approval Link Failure path', () => {

    const spy = jest.spyOn(riskProfileService, 'activateApprovalLink').mockReturnValue(throwError(mockError));

    actions = of(OrderSummaryApplicationAction.orderActivatedApprovalLink({
      data: {
        transactionId: 1
      }
    }));


    effects.orderActivatedApprovalLink$
      .subscribe(action => {
        expect(action.data).toEqual(OrderSummaryApplicationAction.orderActivatedApprovalLinkFailure({
          data: mockError
        }));
        expect(spy).toHaveBeenCalledTimes(1);
      });

  });

})
