import { INonDefaultAccount, IRegionalDirectorForm } from './transaction.models';
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { transactionSearchReducer, initialState } from '../+state/transaction.reducer';
import { MockApprovers } from '../mock/approvers.mock';
import { MockISearchFundData, MockRiskProfileInquiry } from '../mock/fund-details.mock';
import { MockSalesChargeRequest, MockSalesChargeResponse } from '../mock/sales-charge.mock';
import { ISalesChargeDropDowmResponse } from '../models/sales-charge.model';
import * as TransactionActions from './transaction.actions';
import { mockDraftTransactionIdResponse, mockDraftTransactionResponse, mockTransactionAppRequest, mockTransactionAppResponse } from './transaction.effects.spec';
import { Branch, IFundDataRequest, IFundDataResponse, IProductTransactionRequest, ISalesFormDataRequest, ISearchFundData, IRefferalTransactionRequest, ITotalFundAmount } from './transaction.models';
import { mockAcKnowledgementResponse, MockDeletedDraftRes } from './transaction.selector.spec';

const mockRequest: IFundDataRequest = {
    fundName: '123',
    cifNumber: "10330000219671",
    accountNo: ['A1234', 'B1234'],
    riskCategory: ['Defensive', 'Balanced'],
    assetClass: ['Alternative', 'Cash'],
    fundType: ['Conventional', 'CIMBFocusBonds'],
    fundCurrency: ['LocalCurrency'],
};

export const MockISalesFormData: ISalesFormDataRequest = {
    isValid: false,
    formData: {
        salesBranch:'branch',
        staffBranch: 'staff'
    }
}

export const MockIRefferalFormData: IRefferalTransactionRequest = {
    formData: {
        remarks: "string",
        referralCode: "string",
        referralName: "string",
        referralBranch: "string"
    }
}

export const MockIProductTransactionFormData: IProductTransactionRequest = {
    isValid: false,
    formData: {
        rmId : "1",
        sibsCif : "1111",
        customerName :"aaaa",
        productType : "0",
        transactionType : "1",
        investAccountNo : "123456",
        settlementAccountNo : "12345",
        dTotalTransactionAmount : 1500,
        approverId : 1,
        requestUid : "string",
    }
}


const mockResponse: ISearchFundData[] = [
    {
        fundId: 123,
        fundCode: 'ABC',
        fundName: 'Affin Hwang AIIMAN Balanced Fund',
        fundStatus: 'Active',
        customerHolding: 1,
        focusFund: 1,
    },
];

const mockBranch: Branch[] = [
    {
        "branchCode": "1414",
        "branchName": "Sri Petaling"
    },
    {
        "branchCode": "1415",
        "branchName": "Damansara Town Centre"
    },
    {
        "branchCode": "1416",
        "branchName": "Taman Tun"
    },
    {
        "branchCode": "1417",
        "branchName": "Bandar Utama"
    },
    {
        "branchCode": "1418",
        "branchName": "Bangsar"
    }
]

export const MockITotalFundAmount: ITotalFundAmount = {
    totalAmount: "string",
    salesChargeAmountTotal: "string",
    netinvestedAmountToal: "string"
}

const mockResponseData: IFundDataResponse = {
    fundData: mockResponse,
};

export const MockNonDefaultAccount : INonDefaultAccount = {
    investAccountNo: 'string',
    settlementAccountNo: 'string',
}

export const MockRegionalDirector : IRegionalDirectorForm = {
    isValid: false,
    isDirty: false,
}


describe('Transaction Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {};

            const result = transactionSearchReducer(initialState, action as any);

            expect(result).toBe(initialState);
        });
    });
});

describe('SearchFund action start', () => {
    it('should start to load data from API', () => {
        const action = TransactionActions.getSearchFunds({
            data: mockRequest,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.request).toEqual(mockRequest);
    });
});

describe('SearchFund action success', () => {
    it('should successfully load data from API', () => {
        const action = TransactionActions.getSearchFundsSuccess({
            data: mockResponseData,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.fundData).toEqual(mockResponse);
    });
});

describe('SearchFund action error', () => {
    it('should show error from API', () => {
        const action = TransactionActions.getSearchFundsFailure({
            data: 'error happen',
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.errorMessage).toEqual('error happen');
    });
});

describe('get all branch', () => {
    it('should get all branch', () => {
        const action = TransactionActions.getBranches({
            branches: mockBranch,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.branches).toEqual(mockBranch);
    });
});


describe('Should handle Risk Inquiry', () => {
    it('should get risk inquiry', () => {
        const action = TransactionActions.riskProfileEnqiry({
            data: MockRiskProfileInquiry,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.riskProfileInquiry).toEqual(MockRiskProfileInquiry);
    });

    it('should set null in case of error', () => {
        const action = TransactionActions.riskProfileEnqiryFailure({
            data: '',
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.riskProfileInquiry).toEqual(null);
    });
});

describe('should handle Subscribe funds', () => {
    it('should populate the subscribe funds', () => {
        const action = TransactionActions.subscribedFunds({
            data: MockISearchFundData,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.subscribeFunds).toEqual(MockISearchFundData);
    })
})

describe('should handle Active Approvers', () => {
    it('should populate the active approvers', () => {
        const action = TransactionActions.activeApprover({
            data: MockApprovers,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.activeApprovers).toEqual(MockApprovers);
    })
})

describe('should handle create application form data', () => {
    it('should store product transaction form', () => {
        const action = TransactionActions.productTransactionFormData({
            data: MockIProductTransactionFormData,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.productTransactionFormData).toEqual(MockIProductTransactionFormData);
    })

    it('should store sales form', () => {
        const action = TransactionActions.salesFormData({
            data: MockISalesFormData,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.salesFormData).toEqual(MockISalesFormData);
    })

    it('should store acknowledge form', () => {
        const action = TransactionActions.acknowledgeFormdata({
            data: mockAcKnowledgementResponse,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.acknowledgeFormData).toEqual(mockAcKnowledgementResponse);
    })

    it('should store refferal form', () => {
        const action = TransactionActions.referralTransactionFormData({
            data: MockIRefferalFormData,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.refferalFormData).toEqual(MockIRefferalFormData);
    })


    it('should store createApplicationData', () => {
        const action = TransactionActions.createApplication({
            data: mockTransactionAppRequest,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.createApplicationData).toEqual(mockTransactionAppRequest);
    })

    it('should store savedDraftApp data success', () => {
        const action = TransactionActions.saveDraftApplicationSuccess({
            data: mockDraftTransactionResponse,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.savedDraftResponse).toEqual(mockDraftTransactionResponse);
    })

    it('should store createdApplication data success', () => {
        const action = TransactionActions.createApplicationSuccess({
            data: mockTransactionAppResponse,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.createdApplication).toEqual(mockTransactionAppResponse);
    })

    it('should store deleteCustomerDraftSuccess data success', () => {
        const action = TransactionActions.deleteCustomerDraftSuccess({
            data: MockDeletedDraftRes,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.deletedDraft).toEqual(MockDeletedDraftRes);
    })

    it('should store getDraftTransactionIdDetailsSuccess data success', () => {
        const action = TransactionActions.getDraftTransactionIdDetailsSuccess({
            data: mockDraftTransactionIdResponse,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.getSavedDraftDetails).toEqual(mockDraftTransactionIdResponse);
    });

    it('should store a map for salescharge drop down as per request', () => {
        const map: Map<string, ISalesChargeDropDowmResponse[]> = new Map();
        map.set(MockSalesChargeRequest.fundCode ? MockSalesChargeRequest.fundCode : '', MockSalesChargeResponse);
        const action = TransactionActions.salesChargeDropDownValues({
            data: map,
        });

        const result = transactionSearchReducer(initialState, action);
        expect(result.salesChargeDropDown).toEqual(map);
    });

    it('should store a map for switchOutFund', () => {
        const map: Map<string, ISearchFundData[]> = new Map();
        map.set(MockSalesChargeRequest.fundCode ? MockSalesChargeRequest.fundCode : '', MockISearchFundData);
        const action = TransactionActions.switchOutFunds({
            data: map,
        });

        const result = transactionSearchReducer(initialState, action);
        expect(result.switchOutFunds).toEqual(map);
    })

    it('should give switch in devation status', () => {

        const action = TransactionActions.switchInFundDeviation({
            status: true,
        });

        const result = transactionSearchReducer(initialState, action);
        expect(result.switchInDeviation).toEqual(true);
    })

    it('should get Total Amount Fund', () => {
        const action = TransactionActions.getTotalAmountFund({
            data: MockITotalFundAmount,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.totalFundAmount).toEqual(MockITotalFundAmount);
    })

    it('should get Total Transaction Fund', () => {
        const action = TransactionActions.getTotalTransactionAmount({
            data: undefined,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.totalTransactionAmount).toEqual(undefined);
    })

    it('should get Enable Transaction Amount Error', () => {
        const action = TransactionActions.enableTransactionAmountError({
            data: false,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.transactionAmountErrorEnable).toEqual(false);
    })

    it('should set setSearchDirtyCheck', () => {
        const action = TransactionActions.setSearchDirtyCheck({
            data: true,
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.searchForm).toEqual(true);
    })

    it('should set getNonDefaultAccount', () => {
        const action = TransactionActions.getNonDefaultAccount({
            payload: MockNonDefaultAccount
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.nondefaultAccount).toEqual(null);
    })

    it('should set getNonDefaultAccount', () => {
        const action = TransactionActions.getRegionalDirectorForm({
            data: MockRegionalDirector
        });

        const result = transactionSearchReducer(initialState, action);

        expect(result.regionalFormdata).toEqual(MockRegionalDirector);
    })
    
})

