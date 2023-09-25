/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as Actions from './dashboard.actions';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { DashboardService } from '../services/dashboard.service';

import { DashboardEffects } from './dashboard.effects';
import { IRmDetails } from './dashboard.models';
import { CoreService, Environment } from '@cimb/mint-office';


class mockDashboardService {
  getTransaction() { /* mock */ }
  getRmDetail() { /* mock */ }
}

const mockState = {}

const mockData: IRmDetails = {
  rmId: "1",
  lanId: "1",
  name: "string",
  mobileNumber: "123456789",
  branch: "1",
  status: "string",
  createDate: "string",
}
const apiUrl = '/';
const production = false;
const environment: Environment = { production, apiUrl }
describe('DashboardEffects', () => {
    let actions: Observable<any>;
    let effects: DashboardEffects;
    let dashboardService: DashboardService;
    let coreService: CoreService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
              DashboardEffects,
              provideMockActions(() => actions),
              provideMockStore({ initialState: mockState }),
              { provide: 'environment', useValue: environment},
              {
                provide: DashboardService, useClass: mockDashboardService
              },
           ],
        });

        effects = TestBed.inject(DashboardEffects);
        dashboardService = TestBed.inject(DashboardService);
        coreService = TestBed.inject(CoreService);
    });


  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should get successful RmDetails', (done) => {
    const spy = jest.spyOn(dashboardService, 'getRmDetail').mockReturnValue(of(mockData));

    actions = of(Actions.getRmDetail({data: '1'}));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.getRmDetail$
      .subscribe(action => {
        expect(action).toEqual(Actions.getRmDetailSuccess({
          rmDetail: mockData
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

})

