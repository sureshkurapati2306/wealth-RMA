/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';

import * as NewInvestmentApplicationAction from './new-application.actions';
import { NewApplicationService } from '../services/new-application.service';
import { newAppliactionInitState } from '../mock/new-investment-state.mock';
import { MockCustomerType, MockSalutations, MockGenderList, MockCoutryLIst, MockCitizens, MockOccupations, MockEmployementList, MockMaritalList, MockReligionList, MockRaceList, mockUtAccountOpeningData, mockUtAccountOpeningRequest, MockAddressTypeList, MockStatesList } from '../mock/new-investment-spec.mock';
import { Action } from '@ngrx/store';
import { NewApplicationEffect } from './new-application.effects';

class MockApiService {
  getCustomertype() { /* mock */ }
  getTitleSalutations() { /* mock */ }
  getGenderList() { /* mock */ }
  getCountryList() { /* mock */ }
  getCitizenList() { /* mock */ }
  getRaceList() { /* mock */ }
  getReligionList() { /* mock */ }
  getMartialStatusList() { /* mock */ }
  getIndustryList() { /* mock */ }
  getOccupationList() { /* mock */ }
  getUtAccountOpening() {/* mock */ }
  getCustomerProfile() { /* mock */ }
  getAddressTypeList() { /* mock */ }
  getStatesList() { /* mock */ }
}
describe('NewApplicationEffect', () => {
  let actions: Observable<Action>;
  let effects: NewApplicationEffect;
  let investmentApiService: NewApplicationService;
  const mockError = 'Mock error';

  const transformError = (action: any, spy: any) => {
    expect(action).toEqual(NewInvestmentApplicationAction.getAllDropDownDataFailure({
      data: mockError
    }));
    expect(spy).toHaveBeenCalledTimes(1);
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        NewApplicationEffect,
        provideMockActions(() => actions),
        provideMockStore({ initialState: newAppliactionInitState }),
        {
          provide: NewApplicationService, useClass: MockApiService
        },
      ],
    });

    effects = TestBed.inject(NewApplicationEffect);
    investmentApiService = TestBed.inject(NewApplicationService);
  });


  it('should be created', () => {
    expect(effects).toBeTruthy();
  });


  it('should fetch getCustomertype with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getCustomertype').mockReturnValue(of(MockCustomerType));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.getCustomertype$
      .subscribe(res => {
        expect(res).toEqual(NewInvestmentApplicationAction.getCustomerTypeDataSuccess({
          data: MockCustomerType
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run getCustomertype Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getCustomertype').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.getCustomertype$
      .subscribe(action => {
        transformError(action, spy);
      });

  });


  it('should fetch titleSalutations with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getTitleSalutations').mockReturnValue(of(MockSalutations));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.titleSalutations$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getTitleSalutationsDataSuccess({
          data: MockSalutations
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run titleSalutations Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getTitleSalutations').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.titleSalutations$
      .subscribe(action => {
        transformError(action, spy);
      });

  });


  it('should fetch genderList with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getGenderList').mockReturnValue(of(MockGenderList));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.genderList$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getGenderListDataSuccess({
          data: MockGenderList
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run genderList Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getGenderList').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.genderList$
      .subscribe(action => {
        transformError(action, spy);
      });

  });


  it('should fetch nationalityList with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getCountryList').mockReturnValue(of(MockCoutryLIst));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.nationalityList$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getCountryListDataSuccess({
          data: MockCoutryLIst
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run nationalityList Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getCountryList').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.nationalityList$
      .subscribe(action => {
        transformError(action, spy);
      });

  });


  it('should fetch citizenList with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getCitizenList').mockReturnValue(of(MockCitizens));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.citizenList$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getCitizenListDataSuccess({
          data: MockCitizens
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run citizenList Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getCitizenList').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.citizenList$
      .subscribe(action => {
        transformError(action, spy);
      });

  });

  it('should fetch raceList with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getRaceList').mockReturnValue(of(MockRaceList));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.raceList$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getRaceListDataSuccess({
          data: MockRaceList
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run raceList Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getRaceList').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.raceList$
      .subscribe(action => {
        transformError(action, spy);
      });

  });


  it('should fetch religionList with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getReligionList').mockReturnValue(of(MockReligionList));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.religionList$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getReligionListDataSuccess({
          data: MockReligionList
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run religionList Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getReligionList').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.religionList$
      .subscribe(action => {
        transformError(action, spy);
      });

  });


  it('should fetch martialStatusList with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getMartialStatusList').mockReturnValue(of(MockMaritalList));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.martialStatusList$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getMaritalListDataSuccess({
          data: MockMaritalList
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run martialStatusList Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getMartialStatusList').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.martialStatusList$
      .subscribe(action => {
        transformError(action, spy);
      });

  });

  it('should fetch industryList with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getIndustryList').mockReturnValue(of(MockEmployementList));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.industryList$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getIndustryListDataSuccess({
          data: MockEmployementList
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run industryList Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getIndustryList').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.industryList$
      .subscribe(action => {
        transformError(action, spy);
      });

  });

  it('should fetch professionList with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getOccupationList').mockReturnValue(of(MockOccupations));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.professionList$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getOccupationListDataSuccess({
          data: MockOccupations
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run professionList Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getOccupationList').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.professionList$
      .subscribe(action => {
        transformError(action, spy);
      });

  });

  it('should fetch addressTypeList with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getAddressTypeList').mockReturnValue(of(MockAddressTypeList));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.addressTypeList$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getAddressTypeListSuccess({
          data: MockAddressTypeList
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run addressTypeList Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getAddressTypeList').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.addressTypeList$
      .subscribe(action => {
        transformError(action, spy);
      });

  });

  it('should fetch addressTypeList with success status', (done) => {
    const spy = jest.spyOn(investmentApiService, 'getStatesList').mockReturnValue(of(MockStatesList));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.statesList$
      .subscribe(action => {
        expect(action).toEqual(NewInvestmentApplicationAction.getStatesListSuccess({
          data: MockStatesList
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should run addressTypeList Failure path', () => {

    const spy = jest.spyOn(investmentApiService, 'getStatesList').mockReturnValue(throwError(mockError));

    actions = of(NewInvestmentApplicationAction.getAllDropDownData({
      data: null
    }));

    effects.statesList$
      .subscribe(action => {
        transformError(action, spy);
      });

  });

})
