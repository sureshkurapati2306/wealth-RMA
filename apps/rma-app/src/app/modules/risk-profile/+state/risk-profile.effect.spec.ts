import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { Observable, of, throwError } from "rxjs";
import { MockIRiskProfileDataRequest, MockIRiskProfileDataResponse } from "../mock/risk-profile-spec.mock";
import { RiskProfileInitailState } from "../mock/risk-profile-state.mock";
import { RiskProfileService } from "../services/risk-profile.service";
import { RiskProfileEffect } from "./risk-profile.effect";
import * as RiskProfileAction from './risk-profile.action';
import { MockIActivateApprovalLinkRequest, MockIActivatedApprovalLinkRequest, MockIActivatedApprovalLinkResponse, MockIRiskProfileMobileNoRequest, MockIRiskProfileSummaryRequest, MockIRiskProfileSummaryResponse, MockIRiskProfileUpdateMobileNoRequest, MockIRiskProfileUpdateMobileNoRes, MockUpdateRiskProfileQuestionnaireRequest, MockUpdateRiskProfileQuestionnaireResponse, MockGetCustomerStatus, MockGetMobileNoRequest } from "../mock/risk-profile-summary-spec.mock";


class MockRiskProfileService {
    getRiskProfileInquiryData() { /* mock */ }
    updateRiskProfileMobile() { /* mock */ }
    getCustomerRiskProfileMobile() {/* mock */ }
    getCustomerRiskProfileSummary() {/* mock */ }
    updateActivatedApprovalLink() {/* mock */}
    activateApprovalLink() {/* mock */}
    createRPQTnx() { /* mock */}
    checkCustomerStatus() { /* mock */ }
}

const activedApprovalLinkResponse = (action: any, spy: any) => {
  expect(action).toEqual(RiskProfileAction.updateActivatedApprovalLinkSuccess({
    data: MockIActivatedApprovalLinkResponse
  }));
  expect(spy).toHaveBeenCalledTimes(1);
}

const updateRiskProfileQuestionnaireResponse = (action: any, spy: any) => {
  expect(action).toEqual(RiskProfileAction.updateRiskProfileQuestionnaireRes({
    data: MockUpdateRiskProfileQuestionnaireResponse
  }));
  expect(spy).toHaveBeenCalledTimes(1);
}

describe('RiskProfileEffect', () => {
    let actions: Observable<Action>;
    let effects: RiskProfileEffect;
    let riskProfileService: RiskProfileService;
    const mockError = 'Mock error';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RiskProfileEffect,
              provideMockActions(() => actions),
              provideMockStore({ initialState: RiskProfileInitailState }),
              {
                provide: RiskProfileService, useClass: MockRiskProfileService
              },
           ],
        });

        effects = TestBed.inject(RiskProfileEffect);
        riskProfileService = TestBed.inject(RiskProfileService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should fetch riskProfile with success status', (done) => {
        const spy = jest.spyOn(riskProfileService, 'getRiskProfileInquiryData').mockReturnValue(of(MockIRiskProfileDataResponse));

        actions = of(RiskProfileAction.getRiskProfileInquiryDetail({
          data: MockIRiskProfileDataRequest
        }));

        effects.getRiskProfileInquiryData$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.getRiskProfileInqiryDetailSuccess({
              data: MockIRiskProfileDataResponse
            }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
          });
      });

      it('should run fetch riskProfile Failure path', () => {

        const spy = jest.spyOn(riskProfileService, 'getRiskProfileInquiryData').mockReturnValue(throwError(mockError));

        actions = of(RiskProfileAction.getRiskProfileInquiryDetail({
          data: MockIRiskProfileDataRequest
        }));

        effects.getRiskProfileInquiryData$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.getRiskProfileInqiryDetailFailure({
              data: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });

      it('should update risk Profile mobile with success status', (done) => {
        const spy = jest.spyOn(riskProfileService, 'updateRiskProfileMobile').mockReturnValue(of({mobileNumber: '123'}));

        actions = of(RiskProfileAction.updateRiskProfileMobile({
          data: MockIRiskProfileUpdateMobileNoRequest
        }));


        effects.updateRiskProfileMobile$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.updateRiskProfileMobileSuccess({data: {mobileNumber: '123'}}));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
          });
      });

      it('should run update risk Profile mobile Failure path', () => {

        const spy = jest.spyOn(riskProfileService, 'updateRiskProfileMobile').mockReturnValue(throwError(mockError));

        actions = of(RiskProfileAction.updateRiskProfileMobile({
          data: MockIRiskProfileUpdateMobileNoRequest
        }));
        effects.updateRiskProfileMobile$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.updateRiskProfileMobileFailure({
              data: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });

      it('should get risk Profile mobile no success status', (done) => {
        const spy = jest.spyOn(riskProfileService, 'getCustomerRiskProfileMobile').mockReturnValue(of(MockIRiskProfileUpdateMobileNoRes));

        actions = of(RiskProfileAction.getRiskProfileMobileNo({
          data: MockIRiskProfileMobileNoRequest
        }));

        effects.getRiskProfileMobileNo$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.getRiskProfileMobileNoSuccess({
              data: MockIRiskProfileUpdateMobileNoRes
            }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
          });
      });

      it('should run risk Profile mobile no Failure path', () => {

        const spy = jest.spyOn(riskProfileService, 'getCustomerRiskProfileMobile').mockReturnValue(throwError(mockError));

        actions = of(RiskProfileAction.getRiskProfileMobileNo({
          data: MockIRiskProfileMobileNoRequest
        }));

        effects.getRiskProfileMobileNo$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.getRiskProfileMobileNoFailure({
              data: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });

      it('should get risk Profile summary success status', (done) => {
        const spy = jest.spyOn(riskProfileService, 'getCustomerRiskProfileSummary').mockReturnValue(of(MockIRiskProfileSummaryResponse));

        actions = of(RiskProfileAction.getRiskProfileSummary({
          data: MockIRiskProfileSummaryRequest
        }));

        effects.getRiskProfileSummary$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.getRiskProfileSummarySuccess({
              data: MockIRiskProfileSummaryResponse
            }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
          });
      });

      it('should run risk Profile summary Failure path', () => {

        const spy = jest.spyOn(riskProfileService, 'getCustomerRiskProfileSummary').mockReturnValue(throwError(mockError));

        actions = of(RiskProfileAction.getRiskProfileSummary({
          data: MockIRiskProfileSummaryRequest
        }));

        effects.getRiskProfileSummary$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.getRiskProfileSummaryFailure({
              data: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });

      it('should update Activated Approval Link success status', (done) => {
        const spy = jest.spyOn(riskProfileService, 'updateActivatedApprovalLink').mockReturnValue(of(MockIActivatedApprovalLinkResponse));

        actions = of(RiskProfileAction.updateActivatedApprovalLink({
          data: MockIActivatedApprovalLinkRequest
        }));

        effects.updateActivatedApprovalLink$
          .subscribe(action => {
            activedApprovalLinkResponse(action, spy);
            done();
          });
      });

      it('should Activate Approval Link success status', (done) => {
        const spy = jest.spyOn(riskProfileService, 'activateApprovalLink').mockReturnValue(of(MockIActivatedApprovalLinkResponse));

        actions = of(RiskProfileAction.activateApprovalLink({
          data: MockIActivateApprovalLinkRequest
        }));

        effects.activateApprovalLink$
          .subscribe(action => {
            activedApprovalLinkResponse(action, spy);
            done();
          });
      });

      it('should update risk profile questionnaire with success status', (done) => {
        const spy = jest.spyOn(riskProfileService, 'createRPQTnx').mockReturnValue(of(MockUpdateRiskProfileQuestionnaireResponse));

        actions = of(RiskProfileAction.updateRiskProfileQuestionnaireReq({
          data: MockUpdateRiskProfileQuestionnaireRequest
        }));

        effects.updateRiskProfileQuestionnaire$
          .subscribe(action => {
            updateRiskProfileQuestionnaireResponse(action, spy);
            done();
          });
      });

      it('should get customer status success', (done) => {
        const spy = jest.spyOn(riskProfileService, 'checkCustomerStatus').mockReturnValue(of(MockGetCustomerStatus));

        actions = of(RiskProfileAction.getCustomerStatus({
          data: MockGetMobileNoRequest
        }));

        effects.getCustomerStatus$
        .subscribe(action => {
          expect(action).toEqual(RiskProfileAction.getCustomerStatusSuccess({
            data: MockGetCustomerStatus
          }));
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
      });

      it('should run get customer status Failure path', () => {

        const spy = jest.spyOn(riskProfileService, 'checkCustomerStatus').mockReturnValue(throwError(mockError));

        actions = of(RiskProfileAction.getCustomerStatus({
          data: MockGetMobileNoRequest
        }));

        effects.getCustomerStatus$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.getCustomerStatusFailure({
              data: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });

      it('should run updateActivatedApprovalLink Failure path', () => {

        const spy = jest.spyOn(riskProfileService, 'updateActivatedApprovalLink').mockReturnValue(throwError(mockError));

        actions = of(RiskProfileAction.updateActivatedApprovalLink({
          data: MockIActivatedApprovalLinkRequest
        }));

        effects.updateActivatedApprovalLink$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.updateActivatedApprovalLinkFailure({
              data: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });

      it('should run Activate Approval Link Failure path', () => {

        const spy = jest.spyOn(riskProfileService, 'getCustomerRiskProfileMobile').mockReturnValue(throwError(mockError));

        actions = of(RiskProfileAction.getRiskProfileMobileNo({
          data: MockIRiskProfileMobileNoRequest
        }));

        effects.activateApprovalLink$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.activateApprovalLinkFailure({
              data: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });

      it('should run updateRiskProfileQuestionnaire Failure path', () => {

        const spy = jest.spyOn(riskProfileService, 'createRPQTnx').mockReturnValue(throwError(mockError));

        actions = of(RiskProfileAction.updateRiskProfileQuestionnaireReq({
          data: MockUpdateRiskProfileQuestionnaireRequest
        }));

        effects.updateRiskProfileQuestionnaire$
          .subscribe(action => {
            expect(action).toEqual(RiskProfileAction.updateRiskProfileQuestionnaireFailure({
              data: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });
})
