/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { transactionReducer, initialState } from '../+state/transaction.reducer';
import * as Actions from '../+state/transaction.action';
import { ProductType, TransactionDataRequestDTO, ApplicationStatus, ITransactionType, TransactionDataResponseDTO } from '../models/application-status.model';
import { mockData, mockInvestmentResponse } from '../mock/customer-holding-mock.data';

const mockRequest: TransactionDataRequestDTO = {
    rmId: "123",
    customerId: "345",
    days: 10,
    pageNo: 1,
    pageSize: 0,
    productType: ProductType.UT,
    sortingFieldsOrder: ["createdDateTime.desc", "customerName.asc"],
    transactionStatus: [ApplicationStatus.Confirm],
    transactionType: [ITransactionType.Redeem]
}

const mockResponse: TransactionDataResponseDTO = {
    action: "Success",
    totalRecords: 2,
    pageNo: 1,
    pageSize: 10,
    rmId: 1234,
    prdType: ProductType.UT,
    transactions: [
        {
            id: 5,
            customerName: "Joe",
            refId: 123456,
            creationDate: "23-12-2020,16:45",
            applicationStatus: ApplicationStatus.Confirm,
            transactionType: ITransactionType.Redeem,
            rpExpiry: true,
            rpqApprovalStatus: "Y"
        }
    ]
}
const errorMessage = 'Error Happen!'

describe('Transaction Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {};

            const result = transactionReducer(initialState, action as any);

            expect(result).toBe(initialState);
        });
    });
});

describe('Transaction action start', () => {
    it('should start to load data from API', () => {
        const action = Actions.transactionStart({
            data: mockRequest
        });

        const result = transactionReducer(initialState, action);

        expect(result.applicationStatus.request).toEqual(mockRequest);
    });
});

describe('Transaction action success', () => {
    it('should successfully load data from API', () => {
        const action = Actions.transactionSuccess({
            data: mockResponse
        });

        const result = transactionReducer(initialState, action);

        expect(result.applicationStatus.response).toEqual(mockResponse);
    });
});

describe('Transaction action error', () => {
    it('should show error from API', () => {
        const action = Actions.transactionFailure({
            data: errorMessage,
        });

        const result = transactionReducer(initialState, action);

        expect(result.applicationStatus.errorMessage).toEqual(errorMessage);
    });
});

describe('customer holding action start', () => {
    it('should start to load data from API', () => {
        const action = Actions.getInvestmentTransaction({
            data: mockData
        });

        const result = transactionReducer(initialState, action);

        expect(result.applicationHolding.request).toEqual(mockData);
    });
});

describe('customer holding action success', () => {
    it('should successfully load data from API', () => {
        const action = Actions.investmentTransactionSuccess({
            data: mockInvestmentResponse
        });

        const result = transactionReducer(initialState, action);

        expect(result.applicationHolding.response).toEqual(mockInvestmentResponse);
    });
});

describe('customer holding action error', () => {
    it('should show error from API', () => {
        const action = Actions.investmentTransactionError({
            data: errorMessage,
        });

        const result = transactionReducer(initialState, action);

        expect(result.applicationHolding.errorMessage).toEqual(errorMessage);
    });
});
