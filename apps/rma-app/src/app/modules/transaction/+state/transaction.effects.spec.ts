import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';

import { TransactionService } from '../services/transaction.service';
import { TransactionEffects } from './transaction.effects';
import * as Actions from './transaction.actions';
import { Branch, IDraftTransactionResponse, IFundDataRequest, IFundDataResponse, IGetTransactionIdRequest, ISearchFundData, ITransactionAppRequest, ITransactionAppResponse, INonDefaultAccountResponse, INonDefaultAccount } from './transaction.models';
import { MockFundDetailData, MockISearchFundData, MockRiskProfileInquiry, MockSwitchoutFundRequest } from '../mock/fund-details.mock';
import { MockDeletedDraftRes } from './transaction.selector.spec';
import { IGetTrxDetailResponse } from '../models/risk-profile.model';
import { MockSalesChargeRequest, MockSalesChargeResponse } from '../mock/sales-charge.mock';
import { ISalesChargeDropDowmResponse } from '../models/sales-charge.model';
import { Environment } from '@cimb/mint-office';

class MockTransactionService {
    getSearchFunds() { /* mock */ }
    getAllBranches() { /* mock */ }
    getPastPerformance() { /* mock */ }
    getFundDetails() { /* mock */ }
    getPerformanceChart() { /* mock */ }
    getRiskProfileInquiry() { /* mock */ }
    getActiveApprover() { /* mock */ }
    createApplication() { /* mock */ }
    deleteCustomerDraft() {/* mock */}
    getDraftTransactionIdDetails() {/* mock */}
    createDraftTransaction() {/* mock */}
    getSalesChargeDropDown() { /* mock */ }
    getSwitchOutFunds() { /* mock */ }
    getNonDefaultAccount() { /* mock */ }
}

export const mockTransactionAppRequest: ITransactionAppRequest = {
    "rmId" : "1",
    "sibsCif" : "123",
    "customerName" :"test1",
    "productType" : "0",
    "transactionType" : "1",
    "investAccountNo" : "1234",
    "settlementAccountNo" : "12345",
    "salesBranch" : "123a",
    "staffBranch" : "abcd",
    "remarks" : "test",
    "referralCode" : "1",
    "referralName" : "a",
    "referralBranch" : "y",
    "dTotalTransactionAmount" : 1200.00,
    "approverId" : 1,
    "currencyCode" : "myr",
    "requestUid" : "111",
    "acknowledgement" : "0",
    "fund" : [
    {
    "totalAmount" : "10",
    "currencyCode" : "",
    "fundCode" : "",
    "salesChargeId" : "",
    "salesChargeRate" : "1.00",
    "salesChargeAmount" : "1000.00",
    "remark" : "",
    "fundStatus": "A"
    }
]
};

export const mockTransactionIdRequest: IGetTransactionIdRequest = {
    "trxId": 28
}

export const mockDraftTransactionIdResponse: IGetTrxDetailResponse = {
        "rmId": 1,
        "trxRefId": "TRX1111111",
        "productType": "UT",
        "trxType": "S",
        "currencyCode": "MYR",
        "dTotalTrxAmount": 6000.0,
        "customerName": "James Young",
        "trxStatus": "D",
        "settlementAccountNumber": "A111111",
        "investAccountNumber": "B22222",
        "approverId": 1,
        "remarks": "abc",
        "referralBranch": "",
        "referralCode": "",
        "referralName": "",
        "staffBranch": "",
        "salesBranch": "",
        "acknowledgement": "N1,N2",
        "trxCreateDate": "2022-01-01 11:11:21",
        "trxUpdateDate": "2022-01-01 11:11:11",
        "customerId": "123",
        "draftExpiryDate": "2022-03-01 11:11:41",
        "rmaTransactionDetail": [
            {
                "trxDetStatus": "D",
                "totalAmount": 1000.00,
                "fundCode": "A1111",
                "salesChargeId": "A11",
                "salesChargeRate": 2.0,
                "remark": "aabbcc"
            },
            {
                "trxDetStatus": "D",
                "totalAmount": 5000.00,
                "fundCode": "B1111",
                "salesChargeId": "B11",
                "salesChargeRate": 2.0,
                "remark": "abcc"
            }
        ]
}

export const mockTransactionAppResponse: ITransactionAppResponse = {
    "status": "200",
    "message": "Transaction created successfully",
    "id": "31",
    "transactionRefId": "TRX-Wed Aug 10 11:39:43 MYT 2022",
    "transactionCreateDate": "2022-08-10 11:39:43",
}

export const mockDraftTransactionResponse: IDraftTransactionResponse = {
    "status": "200",
    "message": "Transaction created successfully",
    "trxId": "31",
    "transactionRefId": "TRX-Wed Aug 10 11:39:43 MYT 2022",
    "transactionCreateDate": "2022-08-10 11:39:43",
    "draftExpiryDate": "2022-08-15 11:39:43"
}

const mockRequest: IFundDataRequest = {
    fundName: '123',
    cifNumber: '10330000219671',
    accountNo: ['A1234', 'B1234'],
    riskCategory: ['Defensive', 'Balanced'],
    assetClass: ['Alternative', 'Cash'],
    fundType: ['Conventional', 'CIMBFocusBonds'],
    fundCurrency: ['LocalCurrency'],
};

const mockResponse: IFundDataResponse = {
    fundData: [
        {
            fundId: 123,
            fundCode: 'ABC',
            fundName: 'Affin Hwang AIIMAN Balanced Fund',
            fundStatus: 'Active',
            customerHolding: 1,
            focusFund: 1,
        },
    ],
};

const mockNondefaultResponse: INonDefaultAccountResponse = {
    nonDefaultSettlement: 1
};

const mockNonDefaultRequest : INonDefaultAccount = {
    investAccountNo: '123456789',
    settlementAccountNo: '987654321',
};

const mockState = {};

const errorMsg = 'Mock error';

const mockBranch: Branch[] = [
    {
        branchCode: '1414',
        branchName: 'Sri Petaling',
    },
    {
        branchCode: '1415',
        branchName: 'Damansara Town Centre',
    },
    {
        branchCode: '1416',
        branchName: 'Taman Tun',
    },
    {
        branchCode: '1417',
        branchName: 'Bandar Utama',
    },
    {
        "branchCode": "1418",
        "branchName": "Bangsar"
    }
];


describe('TransactionEffects', () => {
    let actions: Observable<Action>;
    let effects: TransactionEffects;
    let transactionService: TransactionService;
    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                TransactionEffects,
                provideMockActions(() => actions),
                provideMockStore({ initialState: mockState }),
                { provide: 'environment', useValue: environment },
                {
                    provide: TransactionService,
                    useClass: MockTransactionService,
                }
            ],
        });

        effects = TestBed.inject(TransactionEffects);
        transactionService = TestBed.inject(TransactionService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should fetch search funds with success status', (done) => {
        const spy = jest
            .spyOn(transactionService, 'getSearchFunds')
            .mockReturnValue(of(mockResponse));

        actions = of(
            Actions.getSearchFunds({
                data: mockRequest,
            }),
        );

        // subscribe to the Effect stream and verify it dispatches a SUCCESS action
        effects.searchFunds$.subscribe((action) => {
            expect(action).toEqual(
                Actions.getSearchFundsSuccess({
                    data: mockResponse,
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should fetch search funds with error status', (done) => {
        const spy = jest
            .spyOn(transactionService, 'getSearchFunds')
            .mockReturnValue(throwError(errorMsg));
        actions = of(
            Actions.getSearchFunds({
                data: mockRequest,
            }),
        );
        effects.searchFunds$.subscribe((action) => {
            expect(action).toEqual(
                Actions.getSearchFundsFailure({
                    data: errorMsg,
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should fetch all the branches', (done) => {
        const spy = jest
            .spyOn(transactionService, 'getAllBranches')
            .mockReturnValue(of(mockBranch));
        actions = of(Actions.fetchBranches());
        effects.fetchBranches$.subscribe((action) => {
            expect(action).toEqual(
                Actions.getBranches({
                    branches: mockBranch,
                }),
            );
            expect(spy).toHaveBeenCalled();
            done();
        });
    });

    it('should fetch risk profile', (done) => {
        const spy = jest.spyOn(transactionService, 'getRiskProfileInquiry').mockReturnValue(of(MockRiskProfileInquiry));
        actions = of(Actions.riskProfileEnqiryRequest({
          data: {
            cifNumber: 102345,
            custName: '',
            custIdIssue: '',
            custIdNo: '',
            custIdType: ''
          }
        }));
        effects.getRiskProfile$.subscribe(action => {
            expect(action).toEqual(Actions.riskProfileEnqiry({
                data: MockRiskProfileInquiry
            }));
            expect(spy).toHaveBeenCalled();
            done();
        })
    })

    it('should create application', (done) => {
        const spy = jest.spyOn(transactionService, 'createApplication').mockReturnValue(of(mockTransactionAppResponse));
        actions = of(Actions.createApplication({
          data: mockTransactionAppRequest
        }));
        effects.createApplication$.subscribe(action => {
            expect(action).toEqual(Actions.createApplicationSuccess({
                data: mockTransactionAppResponse
            }));
            expect(spy).toHaveBeenCalled();
            done();
        })
    })

    it('should delete customer draft', (done) => {
        const spy = jest.spyOn(transactionService, 'deleteCustomerDraft').mockReturnValue(of(MockDeletedDraftRes));
        actions = of(Actions.deleteCustomerDraft({
          data: {transactionId: 1}
        }));
        effects.deleteCustomerDraft$.subscribe(action => {
            expect(action).toEqual(Actions.deleteCustomerDraftSuccess({
                data: MockDeletedDraftRes
            }));
            expect(spy).toHaveBeenCalled();
            done();
        })
    })

    it('should get saved draft details by id', (done) => {
        const spy = jest.spyOn(transactionService, 'getDraftTransactionIdDetails').mockReturnValue(of(mockDraftTransactionIdResponse));
        actions = of(Actions.getDraftTransactionIdDetails({
          data: {trxId: 1}
        }));
        effects.getDraftTransactionIdDetails$.subscribe(action => {
            expect(action).toEqual(Actions.getDraftTransactionIdDetailsSuccess({
                data: mockDraftTransactionIdResponse
            }));
            expect(spy).toHaveBeenCalled();
            done();
        })
    });

    it('should get sales charge dropdown ', (done) => {
        const spy = jest.spyOn(transactionService, 'getSalesChargeDropDown').mockReturnValue(of(MockSalesChargeResponse));
        actions = of(Actions.getSalesChargeDropDown({
          data: MockSalesChargeRequest
        }));
        effects.getSalesChargeDropDown$.subscribe(action => {
            const map = new Map<string, ISalesChargeDropDowmResponse[]>();
            map.set(MockSalesChargeRequest.fundCode ? MockSalesChargeRequest.fundCode : '', MockSalesChargeResponse);
            expect(action).toEqual(Actions.salesChargeDropDownValues({
                data: map
            }));
            expect(spy).toHaveBeenCalled();
            done();
        })
    });

    it('should get switch out funds ', (done) => {
        const spy = jest.spyOn(transactionService, 'getSwitchOutFunds').mockReturnValue(of(MockISearchFundData));
        actions = of(Actions.getSwitchOutFunds({
          data: MockSwitchoutFundRequest
        }));
        effects.getSwitchOutFunds$.subscribe(action => {
            const map = new Map<string, ISearchFundData[]>();
            map.set(MockSwitchoutFundRequest.fundCode, MockISearchFundData);
            expect(action).toEqual(Actions.switchOutFunds({
                data: map
            }));
            expect(spy).toHaveBeenCalled();
            done();
        })
    })

    it('should get non default account ', (done) => {
        const spy = jest.spyOn(transactionService, 'getNonDefaultAccount').mockReturnValue(of(mockNondefaultResponse));
        actions = of(Actions.getNonDefaultAccount({
          payload: mockNonDefaultRequest
        }));
        effects.getNondefaultAccount$.subscribe(action => {
            expect(action).toEqual(Actions.getNonDefaultAccountSuccess({
                data: mockNondefaultResponse
            }));
            expect(spy).toHaveBeenCalled();
            done();
        })
    })
})
