import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';

import { RiskProfileService } from './risk-profile.service';
import { MockIActivateApprovalLinkRequest, MockIActivatedApprovalLinkRequest, MockIActivatedApprovalLinkResponse, MockIRiskProfileMobileNoRequest, MockIRiskProfileSummaryRequest, MockIRiskProfileSummaryResponse, MockIRiskProfileUpdateMobileNoRequest, MockGetMobileNoRequest, MockIRiskProfileUpdateMobileNoRes, MockUpdateRiskProfileQuestionnaireRequest, MockGetCustomerStatus,  } from '../mock/risk-profile-summary-spec.mock';
import { MockIRiskProfileDataRequest } from '../mock/risk-profile-spec.mock';

describe('RiskProfileService', () => {
    let service: RiskProfileService;
    let httpClient: HttpClient;
    const notFoundMsg = '404 error';

    const throwNotFoundError = (error: HttpErrorResponse) => {
        expect(error.error).toBe(notFoundMsg);
        expect(error.status).toBe(404);
      }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
            providers: [
                RiskProfileService
            ]
        });

        service = TestBed.inject(RiskProfileService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should call getCustomerRiskProfileMobile success path', (done) => {

        jest.spyOn(httpClient, 'get').mockReturnValue(of(MockIRiskProfileUpdateMobileNoRes));

        service.getCustomerRiskProfileMobile(MockGetMobileNoRequest).subscribe(data => {
            expect(data).toEqual(MockIRiskProfileUpdateMobileNoRes);
            done();
        });

    });

    it('should call getCustomerRiskProfileMobile error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getCustomerRiskProfileMobile(MockIRiskProfileMobileNoRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    throwNotFoundError(error);
                    done();
                });
    });

    it('should call updateRiskProfileMobile success path', (done) => {

        jest.spyOn(httpClient, 'put').mockReturnValue(of(MockIRiskProfileUpdateMobileNoRes));

        service.updateRiskProfileMobile(MockIRiskProfileUpdateMobileNoRequest).subscribe(data => {
            expect(data).toEqual(MockIRiskProfileUpdateMobileNoRes);
            done();
        });

    });

    it('should call updateRiskProfileMobile error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpClient, 'put').mockReturnValue(throwError(errorResponse));

        service.updateRiskProfileMobile(MockIRiskProfileUpdateMobileNoRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    throwNotFoundError(error);
                    done();
                });
    });

    it('should call getCustomerRiskProfileSummary success path', (done) => {

        jest.spyOn(httpClient, 'post').mockReturnValue(of(MockIRiskProfileSummaryResponse));

        service.getCustomerRiskProfileSummary(MockIRiskProfileSummaryRequest).subscribe(data => {
            expect(data).toEqual(MockIRiskProfileSummaryResponse);
            done();
        });

    });

    it('should call getCustomerRiskProfileSummary error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getCustomerRiskProfileSummary(MockIRiskProfileSummaryRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    throwNotFoundError(error);
                    done();
                });
    });


    it('should call updateActivatedApprovalLink success path', (done) => {

        jest.spyOn(httpClient, 'get').mockReturnValue(of(MockIActivatedApprovalLinkResponse));

        service.updateActivatedApprovalLink(MockIActivatedApprovalLinkRequest).subscribe(data => {
            expect(data).toEqual(MockIActivatedApprovalLinkResponse);
            done();
        });

    });

    it('should call updateActivatedApprovalLink error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.updateActivatedApprovalLink(MockIActivatedApprovalLinkRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    throwNotFoundError(error);
                    done();
                });
    });

    it('should call getRiskProfileInquiryData error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getRiskProfileInquiryData(MockIRiskProfileDataRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    throwNotFoundError(error);
                    done();
                });
    });


    it('should call activatedApprovalLink success path', (done) => {

        jest.spyOn(httpClient, 'put').mockReturnValue(of(MockIActivatedApprovalLinkResponse));

        service.activateApprovalLink(MockIActivateApprovalLinkRequest).subscribe(data => {
            expect(data).toEqual(MockIActivatedApprovalLinkResponse);
            done();
        });

    });

    it('should call activatedApprovalLink error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpClient, 'put').mockReturnValue(throwError(errorResponse));

        service.activateApprovalLink(MockIActivateApprovalLinkRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    throwNotFoundError(error);
                    done();
                });
    });

        it('should call getMockRiskProfileData error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getMockRiskProfileData({cifNumber: '1234567'}, false)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    throwNotFoundError(error);
                    done();
                });
    });

    it('should call createRPQTnx error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.createRPQTnx(MockUpdateRiskProfileQuestionnaireRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    throwNotFoundError(error);
                    done();
                });
    });

    it('should call checkCustomerStatus success path', (done) => {

        jest.spyOn(httpClient, 'post').mockReturnValue(of(MockGetCustomerStatus));

        service.checkCustomerStatus(MockGetMobileNoRequest).subscribe(data => {
            expect(data).toEqual(MockGetCustomerStatus);
            done();
        });

    });

    it('should call checkCustomerStatus error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.checkCustomerStatus(MockGetMobileNoRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    throwNotFoundError(error);
                    done();
                });
    });

})
