import * as Selectors from './transaction.selector';
import * as transectionReducer from './transaction.reducer';
import { TransactionDataRequestDTO, ProductType, ApplicationStatus, ITransactionType, TransactionDataResponseDTO } from '../models/application-status.model';

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
            rpExpiry: false,
            rpqApprovalStatus: "Y"
        }
    ]
}

const mockState: transectionReducer.State = {
    applicationStatus: {
        errorMessage: '',
        request: mockRequest,
        response: mockResponse,
    },
    applicationHolding: {
        errorMessage: '',
        request: null,
        response: null,
    }
}

const mockStateEmpty: transectionReducer.State = {
    applicationStatus: {
        errorMessage: '',
        request: null,
        response: null,
    },
    applicationHolding: {
        errorMessage: '',
        request: null,
        response: null,
    }
}

describe('Auth Selectors', () => {
    it('should check if we have the requestDTO', () => {
        const result = Selectors.applicationStatusRequestDTO.projector(mockState);

        expect(result).toBeTruthy();
    });

    it('should check if we have the responseDTO', () => {
        const result = Selectors.applicationStatusResponse.projector(mockState);

        expect(result).toBeTruthy();
    });

    it('should check if we have the requestDTO null', () => {
        const result = Selectors.applicationStatusRequestDTO.projector(mockStateEmpty);

        expect(result).toEqual(null);
    });

    it('should check if we have the responseDTO null', () => {
        const result = Selectors.applicationStatusResponse.projector(mockStateEmpty);

        expect(result).toEqual(null);
    });

    it('should check if we have the error', () => {
        const result = Selectors.applicationStatusErrorResponse.projector({...mockStateEmpty, ...{ applicationStatus: {errorMessage: "error messages"}}});

        expect(result).toEqual("error messages");
    });
});
