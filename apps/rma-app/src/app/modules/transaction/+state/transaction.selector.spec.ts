import * as Selectors from './transaction.selectors';
import * as transactionReducer from './transaction.reducer';
import { Branch, IFundDataRequest, IPastPerformanceResponse, ISearchFundData, IAcknowledgeForm, } from './transaction.models';
import { MockISearchFundData, MockRiskProfileInquiry } from '../mock/fund-details.mock';
import { MockApprovers } from '../mock/approvers.mock';
import { MockIProductTransactionFormData, MockISalesFormData, MockIRefferalFormData, MockITotalFundAmount } from './transaction.reducer.spec';
import { mockDraftTransactionIdResponse, mockDraftTransactionResponse } from './transaction.effects.spec';
import { MockSalesChargeRequest, MockSalesChargeResponse } from '../mock/sales-charge.mock';
import { ISalesChargeDropDowmResponse } from '../models/sales-charge.model';

const mockRequest: IFundDataRequest = {
    fundName: "123",
    cifNumber: "10330000219671",
    accountNo: [
        "A1234",
        "B1234"
    ],
    riskCategory: [
        "Defensive",
        "Balanced"
    ],
    assetClass: [
        "Alternative",
        "Cash"
    ],
    fundType: [
        "Conventional",
        "CIMBFocusBonds"
    ],
    fundCurrency: [
        "LocalCurrency"
    ]
}

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

const mockResponse: ISearchFundData[] = [{
    fundId: 123,
    fundCode: "ABC",
    fundName: "Affin Hwang AIIMAN Balanced Fund",
    fundStatus: "Active",
    customerHolding: 1,
    focusFund: 1
}]

const MockCreatedAppData = {
    "status": "200",
    "message": "Transaction created successfully",
    "id": "33",
    "transactionRefId": "TRX-Thu Aug 11 16:39:50 MYT 2022",
    "transactionCreateDate": "2022-08-11 16:39:50"
}

export const MockDeletedDraftRes = {
        "message": "deleted Successfully",
        "data": "",
        "success": true
}

export const mockAcKnowledgementResponse:IAcknowledgeForm  = {"isValid": false};


const mockState: transactionReducer.State = {
    errorMessage: '',
    request: mockRequest,
    fundData: mockResponse,
    branches: mockBranch,
    pastPerformance: [],
    performanceChart: null,
    activeApprovers: MockApprovers,
    createdApplication: MockCreatedAppData,
    deletedDraft: null,
    acknowledgeFormData: mockAcKnowledgementResponse,
    getSavedDraftDetails: null,
    refferalFormData: MockIRefferalFormData,
    savedDraftResponse: mockDraftTransactionResponse,
    salesChargeDropDown: null,
    switchOutFunds: null,
    totalFundAmount: MockITotalFundAmount,
    totalTransactionAmount: undefined,
    transactionAmountErrorEnable: false,
    searchForm: false,
    nondefaultAccount: null,
    regionalFormdata: null
}

const mockStateEmpty: transactionReducer.State = {
    errorMessage: '',
    request: {} as IFundDataRequest,
    fundData: {} as ISearchFundData[],
    branches: mockBranch,
    pastPerformance: {} as IPastPerformanceResponse[],
    performanceChart: null,
    activeApprovers: [],
    createdApplication: null,
    deletedDraft: null,
    acknowledgeFormData: mockAcKnowledgementResponse,
    getSavedDraftDetails: null,
    refferalFormData: null,
    savedDraftResponse: null,
    salesChargeDropDown: null,
    switchOutFunds: null,
    switchInDeviation: false,
    totalFundAmount: null,
    totalTransactionAmount: undefined,
    transactionAmountErrorEnable: false,
    searchForm: false,
    nondefaultAccount: null,
    regionalFormdata: null

}

describe('SearchFunds Selectors', () => {

    it('should check if we have the requestSearchFunds', () => {
        const result = Selectors.requestSearchFunds.projector(mockState);

        expect(result).toBeTruthy();
    });

    it('should check if we have the transactionFundsResponse', () => {
        const result = Selectors.transactionFundsResponse.projector(mockState);

        expect(result).toBeTruthy();
    });

    it('should check if we have the requestSearchFunds null', () => {
        const result = Selectors.requestSearchFunds.projector(mockStateEmpty);

        expect(result).toEqual({});
    });

    it('should check if we have the transactionFundsResponse null', () => {
        const result = Selectors.transactionFundsResponse.projector(mockStateEmpty);

        expect(result).toEqual({});
    });

    it('should check if we have the error', () => {
        const result = Selectors.transactionErrorResponse.projector({ ...mockStateEmpty, ...{ errorMessage: "error messages" } });

        expect(result).toEqual("error messages");
    });

    it('should check if we have all the branches', () => {
        const result = Selectors.branches.projector(mockStateEmpty);

        expect(result).toEqual(mockBranch);
    });

    it('should check if risk profile is enabled', () => {
        const result = Selectors.riskProfileInquiry.projector({...mockStateEmpty, ...{ riskProfileInquiry: MockRiskProfileInquiry}});

        expect(result).toEqual(MockRiskProfileInquiry);
    });

    it('should check if subscribe funds', () => {
        const result = Selectors.subscribeFunds.projector({...mockStateEmpty, ...{ subscribeFunds: MockISearchFundData}});

        expect(result).toEqual(MockISearchFundData);
    });

    it('should check if active approvers is in state', () => {
        const result = Selectors.activeApprovers.projector({...mockStateEmpty, ...{ activeApprovers: MockApprovers }});

        expect(result).toEqual(MockApprovers);
    });

    it('should check if product transaction form data', () => {
        const result = Selectors.productTransactionForm.projector({...mockStateEmpty, ...{ productTransactionFormData: MockIProductTransactionFormData}});

        expect(result).toEqual(MockIProductTransactionFormData);
    });

    it('should check if sales form data', () => {
        const result = Selectors.salesForm.projector({...mockStateEmpty, ...{ salesFormData: MockISalesFormData}});

        expect(result).toEqual(MockISalesFormData);
    });

    it('should check if refferal form data', () => {
        const result = Selectors.refferalFormResponse.projector({...mockStateEmpty, ...{ refferalFormData: MockIRefferalFormData}});

        expect(result).toEqual(MockIRefferalFormData);
    });

    it('should check if acknowledge form data', () => {
        const result = Selectors.acknowledgeFormResponse.projector({...mockStateEmpty, ...{ acknowledgeFormdata: mockAcKnowledgementResponse}});

        expect(result).toEqual(mockAcKnowledgementResponse);
    });

    it('should check if createdApplicationStatus', () => {
        const result = Selectors.createdApplicationStatus.projector({...mockStateEmpty, ...{ createdApplication: MockCreatedAppData}});

        expect(result).toEqual(MockCreatedAppData);
    });

    it('should check if savedDraftAppResponse', () => {
        const result = Selectors.savedDraftAppResponse.projector({...mockStateEmpty, ...{ savedDraftResponse: mockDraftTransactionResponse}});

        expect(result).toEqual(mockDraftTransactionResponse);
    });


    it('should check if deletedDraftResponse', () => {
        const result = Selectors.deletedDraftResponse.projector({...mockStateEmpty, ...{ deletedDraft: MockDeletedDraftRes}});

        expect(result).toEqual(MockDeletedDraftRes);
    });

    it('should check if getSavedDraftDetails', () => {
        const result = Selectors.getSavedDraftDetailsResponse.projector({...mockStateEmpty, ...{ getSavedDraftDetails: mockDraftTransactionIdResponse}});

        expect(result).toEqual(mockDraftTransactionIdResponse);
    });


    it('should check if saveDraftErrorResponse', () => {
        const result = Selectors.saveDraftErrorResponse.projector({...mockStateEmpty, ...{ saveDraftErrorResponse: "error"}});

        expect(result).toEqual("error");
    });

    it('should featch data when sale charge dropdown va;lue changes', () => {
        const map: Map<string, ISalesChargeDropDowmResponse[]> = new Map();
        if(MockSalesChargeRequest.fundCode) {
            map.set(MockSalesChargeRequest.fundCode, MockSalesChargeResponse);
        }
        const result = Selectors.getSalesChargeDropDowns.projector({...mockStateEmpty, ...{ salesChargeDropDown: map}});

        expect(result).toEqual(map);
    });

    it('should featch data when switchout fund requested', () => {
        const map: Map<string, ISearchFundData[]> = new Map();
        map.set('abc', MockISearchFundData);
        const result = Selectors.allSwitchOutFunds.projector({...mockStateEmpty, ...{ switchOutFunds: map}});

        expect(result).toEqual(map);
    });

    it('should featch switch in fund deviation status', () => {
        const result = Selectors.switchInFundDeviationStatus.projector({...mockStateEmpty, ...{ switchInDeviation: false}});
        expect(result).toEqual(false);
    });

    it('should check if Total Fund Amount', () => {
        const result = Selectors.totalFundAmount.projector({...mockStateEmpty, ...{ totalFundAmount: MockITotalFundAmount}});
        expect(result).toEqual(MockITotalFundAmount);
    });

    it('should check if Total Transaction Amount', () => {
        const result = Selectors.totalTransactionAmount.projector({...mockStateEmpty, ...{ totalTransactionAmount: undefined}});
        expect(result).toEqual(undefined);
    });

    it('should check if Get Transaction Amount Error Enable Status', () => {
        const result = Selectors.gettransactionAmountErrorEnableStatus.projector({...mockStateEmpty, ...{ transactionAmountErrorEnable: false}});
        expect(result).toEqual(false);
    });

    it('should check if set getSearchFormDirtyCheck Status', () => {
        const result = Selectors.getSearchFormDirtyCheck.projector({...mockStateEmpty, ...{ searchForm: false}});
        expect(result).toEqual(false);
    });

    it('should check if get non default casa account', () => {
        const result = Selectors.getNonDefaultCasaAccount.projector({...mockStateEmpty, ...{ nondefaultAccount: null}});
        expect(result).toEqual(null);
    });

    it('should check if get regional director form', () => {
        const result = Selectors.regionalDirectorForm.projector({...mockStateEmpty, ...{ regionalFormdata: null}});
        expect(result).toEqual(null);
    });
    
});
