/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { Observable, of, throwError } from "rxjs";
import { CustomerService } from "../services/customer.service";
import { CustomerEffect } from "./customer.effect";
import * as CustomerAction from '../+state/customer.action';
import { customerInitialState, CustomerInvestmentMock, MockRiskProfileRequest, MockRiskProfileResponse, MockUpdateCustomerEmail, MockGetSettingsParam } from "../mock/customer-state.mock";
import { CoreService, Environment } from "@cimb/mint-office";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardService } from "../../dashboard/services/dashboard.service";

class MockCustomerService {
    getRiskProfileInquiry() { /* mock */ }
    postCustomerDetails() { /* mock */ }
    getBlockCountries() { /* mock */ }
    getCoustomerProfile() {/* mock */}
    getTotalInvestment() { /* mock */ }
    updateCustomerEmail() { /* mock */ }
    getSettingsParam() { /* mock */ }
}

describe('CustomerEffect', () => {
    let actions: Observable<Action>;
    let effects: CustomerEffect;
    let customerService: CustomerService;
    let coreService: CoreService;

    const mockError = 'Mock Error';
    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CustomerEffect,
              {provide: 'environment', useValue: environment},
              provideMockActions(() => actions),
              provideMockStore({ initialState: customerInitialState }),
              {
                provide: CustomerService, useClass: MockCustomerService
              },
              {
                provide: DashboardService, useClass: MockCustomerService
              },
           ],
        });

        effects = TestBed.inject(CustomerEffect);

        customerService = TestBed.inject(CustomerService);
        coreService = TestBed.inject(CoreService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should fetch riskProfile with success status', (done) => {
        const spy = jest.spyOn(customerService, 'getRiskProfileInquiry').mockReturnValue(of(MockRiskProfileResponse));

        actions = of(CustomerAction.getRiskProfileInquiry({
          data: MockRiskProfileRequest
        }));

        // subscribe to the Effect stream and verify it dispatches a SUCCESS action
        effects.getRiskProfileInquiry$
          .subscribe(action => {
            expect(action).toEqual(CustomerAction.getRiskProfileInqirySuccess({
              data: MockRiskProfileResponse
            }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
          });
      });

      it('should run fetch riskProfile with Failure path', () => {

        const spy = jest.spyOn(customerService, 'getRiskProfileInquiry').mockReturnValue(throwError(mockError));

        actions = of(CustomerAction.getRiskProfileInquiry({
          data: MockRiskProfileRequest
        }));

        effects.getRiskProfileInquiry$
          .subscribe(action => {
            expect(action).toEqual(CustomerAction.getRiskProfileInqiryFailure({
              data: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });


      it('should fetch customer inveatment with success status', (done) => {
        const spy = jest.spyOn(customerService, 'getTotalInvestment').mockReturnValue(of(CustomerInvestmentMock));

        actions = of(CustomerAction.getCoustomerInvestment({
          cifNumber: "123"
        }));

        // subscribe to the Effect stream and verify it dispatches a SUCCESS action
        effects.getCustomerInvestment$
          .subscribe(action => {
            expect(action).toEqual(CustomerAction.coustomerInvestmentSucess({
              data: CustomerInvestmentMock
            }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
          });
      });

      it('should run fetch riskProfile with Failure path', () => {

        const spy = jest.spyOn(customerService, 'getTotalInvestment').mockReturnValue(throwError(mockError));
        actions = of(CustomerAction.getCoustomerInvestment({
            cifNumber: "123"
          }));

        effects.getCustomerInvestment$
          .subscribe(action => {
            expect(action).toEqual(CustomerAction.coustomerInvestmentError({
              error: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });

      it('should run fetch update customer email with Failure path', () => {

        const spy = jest.spyOn(customerService, 'updateCustomerEmail').mockReturnValue(throwError(mockError));

        actions = of(CustomerAction.updateCustomerEmail({
          payload: MockUpdateCustomerEmail
        }));

        effects.updateCustomerEmail$
          .subscribe(action => {
            expect(action).toEqual(CustomerAction.updateCustomerEmailFailure({
              error: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });

      it('should fetch get SettingsParam with success status', (done) => {
        const spy = jest.spyOn(customerService, 'getSettingsParam').mockReturnValue(of(MockGetSettingsParam));

        actions = of(CustomerAction.getSettingsParam());

        effects.getSettingsParam$
          .subscribe(action => {
            expect(action).toEqual(CustomerAction.getSettingsParamSuccess({
              data: MockGetSettingsParam
            }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
          });
      });
      
      it('should fetch get SettingsParam with failure status', () => {

        const spy = jest.spyOn(customerService, 'getSettingsParam').mockReturnValue(throwError(mockError));

        actions = of(CustomerAction.getSettingsParam());

        effects.getSettingsParam$
          .subscribe(action => {
            expect(action).toEqual(CustomerAction.getSettingsParamFailure({
              error: mockError
            }));
            expect(spy).toHaveBeenCalledTimes(1);
          });

      });

})


