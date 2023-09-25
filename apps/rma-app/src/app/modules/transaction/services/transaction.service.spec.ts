import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { Branch, IFundDataRequest, ISearchFundData, IPastPerformanceResponse } from '../+state/transaction.models';
import { TransactionService } from './transaction.service';
import { MockFundDetailData, MockFundDetailRequest, MockFundSummuryDetail, MockISearchFundData, MockRiskInquiryRequest, MockRiskProfileInquiry, MockSwitchoutFundRequest } from '../mock/fund-details.mock';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FundDocument } from '../models/funds.model';
import { MockApprovers } from '../mock/approvers.mock';
import { mockDraftTransactionIdResponse, mockTransactionIdRequest, mockTransactionAppRequest, mockTransactionAppResponse } from '../+state/transaction.effects.spec';
import { MockSalesChargeRequest, MockSalesChargeResponse } from '../mock/sales-charge.mock';
import { Environment } from '@cimb/mint-office';

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

const mockResponse: ISearchFundData[] = [
    {
        fundId: 123,
        fundCode: "ABC",
        fundName: "Affin Hwang AIIMAN Balanced Fund",
        fundStatus: "Active",
        customerHolding: 1,
        focusFund: 1
    }
]

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

const mockPastPerformance: IPastPerformanceResponse[] = [
    {
        "month": 1,
        "pastPerformance": -60.00
    },
    {
        "month": 3,
        "pastPerformance": -60.00
    },
    {
        "month": 6,
        "pastPerformance": -61.30
    },
    {
        "month": 12,
        "pastPerformance": -61.30
    },
    {
        "month": 60,
        "pastPerformance": -61.30
    }
];

const MockDeleteDraft = {
    "message": "deleted Successfully",
    "data": "",
    "success": true
}

const mockPastPerformanceRequest = 'test';

describe('TransactionService', () => {
    let service: TransactionService;
    let httpClient: HttpClient;
    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl }


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({}),
                MatDialogModule,
                BrowserAnimationsModule
            ],
            providers: [
                {
                    provide: 'environment', useValue: environment
                },
            ]
        });

        service = TestBed.inject(TransactionService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should call getSearchFunds success path', (done) => {

        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockResponse));

        service.getSearchFunds(mockRequest).subscribe(data => {
            expect(data).toEqual(mockResponse);
            done();
        });

    });

    it('should call getBranch success path', (done) => {

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockBranch));

        service.getAllBranches().subscribe(data => {
            expect(data).toEqual(mockBranch);
            done();
        });

    });


    it('should call getPastPerformance success path', (done) => {

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockPastPerformance));

        service.getPastPerformance(mockPastPerformanceRequest).subscribe(data => {
            expect(data).toEqual(mockPastPerformance);
            done();
        });
    });


    it('should call fund details success path', (done) => {
        jest.spyOn(httpClient, 'get').mockReturnValue(of(MockFundDetailData));
        service.getFundDetails(MockFundDetailRequest).subscribe(data => {
            expect(data).toEqual(MockFundDetailData);
            done();
        });
    });

    it('should call fund details error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getFundDetails(MockFundDetailRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    expect(error.error).toBe('404 error');
                    expect(error.status).toBe(404);
                    done();
                });
    });

    it('should call risk profile inquiry success path', (done) => {
        jest.spyOn(httpClient, 'post').mockReturnValue(of({ data: MockRiskProfileInquiry }));
        service.getRiskProfileInquiry(MockRiskInquiryRequest).subscribe(data => {
            expect(data).toEqual(MockRiskProfileInquiry);
            done();
        });
    });


    it('should call risk profile inquiry error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: 'error happen',
            status: 403
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getRiskProfileInquiry(MockRiskInquiryRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    expect(error.error).toBe('error happen');
                    expect(error.status).toBe(403);
                    done();
                });
    });

    it('should call fund summury details success path', (done) => {
        jest.spyOn(httpClient, 'post').mockReturnValue(of(MockFundSummuryDetail));
        service.getFundDetailSummury({ fundCode: "" }).subscribe(data => {
            expect(data).toEqual(MockFundSummuryDetail);
            done();
        });
    });

    it('should call fund summury detail error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: 'fund summury error happen',
            status: 401
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getFundDetailSummury({ fundCode: "" })
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    expect(error.error).toBe('fund summury error happen');
                    expect(error.status).toBe(401);
                    done();
                });
    });

    it('should call create application success path', (done) => {
        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockTransactionAppResponse));
        service.createApplication(mockTransactionAppRequest).subscribe(data => {
            expect(data).toEqual(mockTransactionAppResponse);
            done();
        });
    });

    it('should call fund document success path', (done) => {
        jest.spyOn(httpClient, 'post').mockReturnValue(of(new Blob()));
        service.downloadDocument({} as FundDocument).subscribe(data => {
            expect(data).toEqual(new Blob());
            done();
        });
    });

    it('should call fund document error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'no fund doc found',
            status: 402
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));
        service.downloadDocument({} as FundDocument).subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('no fund doc found');
                expect(error.status).toBe(402);
                done();
            });
    });


    it('should call get active approvers success path', (done) => {
        jest.spyOn(httpClient, 'get').mockReturnValue(of(MockApprovers));
        service.getActiveApprover().subscribe(data => {
            expect(data).toEqual(MockApprovers);
            done();
        });
    });

    it('should call active approvers error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'no active approver found',
            status: 408
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));
        service.getActiveApprover().subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('no active approver found');
                expect(error.status).toBe(408);
                done();
            });
    });

    it('should call delete draft success path', (done) => {
        jest.spyOn(httpClient, 'delete').mockReturnValue(of(MockDeleteDraft));
        service.deleteCustomerDraft(1).subscribe(data => {
            expect(data).toEqual(MockDeleteDraft);
            done();
        });
    });

    it('should call delete draft error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'no draft deleted',
            status: 408
        });

        jest.spyOn(httpClient, 'delete').mockReturnValue(throwError(errorResponse));
        service.deleteCustomerDraft(1).subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('no draft deleted');
                expect(error.status).toBe(408);
                done();
            });
    });

    it('should call save draft success path', (done) => {
        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockDraftTransactionIdResponse));
        service.createDraftTransaction(mockTransactionAppRequest).subscribe(data => {
            expect(data).toEqual(mockDraftTransactionIdResponse);
            done();
        });
    });

    it('should call save draft error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'draft not saved',
            status: 408
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));
        service.createDraftTransaction(mockTransactionAppRequest).subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('draft not saved');
                expect(error.status).toBe(408);
                done();
            });
    });

    it('should call get DraftTransactionIdDetails success path', (done) => {
        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockDraftTransactionIdResponse));
        service.getDraftTransactionIdDetails(mockTransactionIdRequest).subscribe(data => {
            expect(data).toEqual(mockDraftTransactionIdResponse);
            done();
        });
    });

    it('should call get DraftTransactionIdDetails error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'no draft found',
            status: 408
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));
        service.getDraftTransactionIdDetails(mockTransactionIdRequest).subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('no draft found');
                expect(error.status).toBe(408);
                done();
            });
    });

    it('should call get sales charge success path', (done) => {
        jest.spyOn(httpClient, 'post').mockReturnValue(of(MockSalesChargeResponse));
        service.getSalesChargeDropDown(MockSalesChargeRequest).subscribe(data => {
            expect(data).toEqual(MockSalesChargeResponse);
            done();
        });
    });

    it('should call get sales charge error path', (done) => {
        // set the data
        const errorResponse = new HttpErrorResponse({
            error: 'no sales charge found',
            status: 408
        });

        // create the spy
        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        // call the function
        service.getSalesChargeDropDown(MockSalesChargeRequest).subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                // expect the result
                expect(error.error).toBe('no sales charge found');
                expect(error.status).toBe(408);
                done();
            });
    });

    it('should call get switch fund success path', (done) => {
        jest.spyOn(httpClient, 'post').mockReturnValue(of({ fundData: MockISearchFundData }));
        service.getSwitchOutFunds(MockSwitchoutFundRequest).subscribe(data => {
            expect(data).toEqual(MockISearchFundData);
            done();
        });
    });

    it('should call get switch fund error path', (done) => {
        // set the data
        const errorResponse = new HttpErrorResponse({
            error: 'no switch out found',
            status: 403
        });

        // create the spy
        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        // call the function
        service.getSwitchOutFunds(MockSwitchoutFundRequest).subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                // expect the result
                expect(error.error).toBe('no switch out found');
                expect(error.status).toBe(403);
                done();
            });
    });

})
