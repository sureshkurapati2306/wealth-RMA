import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";

import { CoreService, MintOfficeActions } from "@cimb/mint-office";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MintOfficeEffect } from './mint-office.effects';
import { initialState } from './mint-office.reducer';
import { MockCustomerProfile, mockCustomerResponse } from "../mock/data/customer-mock-data";

class MockCoreService {
    getAllCustomers() { /* mock */ }
    getCoustomerProfile() { /* mock */ }
}

describe('MintOfficeEffect', () => {
    let actions: Observable<Action>;
    let effects: MintOfficeEffect;
    let coreService: CoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                MintOfficeEffect,
                provideMockActions(() => actions),
                provideMockStore({ initialState: initialState }),
                {
                    provide: CoreService, useClass: MockCoreService
                },
            ],
        });

        effects = TestBed.inject(MintOfficeEffect);

        coreService = TestBed.inject(CoreService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should fetch customer details', (done) => {
        const spy = jest.spyOn(coreService, 'getAllCustomers').mockReturnValue(of([mockCustomerResponse]));

        actions = of(MintOfficeActions.getCoustomer({ cifNumber: "12345" }));

        // subscribe to the Effect stream and verify it dispatches a SUCCESS action
        effects.getCustomer$
            .subscribe(action => {
                expect(action).toEqual(MintOfficeActions.customer({
                data:mockCustomerResponse
                }));
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
    });

    it('should fetch customer profile details', (done) => {
        const spy = jest.spyOn(coreService, 'getCoustomerProfile').mockReturnValue(of(MockCustomerProfile));

        actions = of(MintOfficeActions.getCoustomer({cifNumber: "1234"}));

        // subscribe to the Effect stream and verify it dispatches a SUCCESS action
        effects.getCustomerProfile$
          .subscribe(action => {
            expect(action).toEqual(MintOfficeActions.customerProfile({
              data: MockCustomerProfile
            }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
          });
      });
})
