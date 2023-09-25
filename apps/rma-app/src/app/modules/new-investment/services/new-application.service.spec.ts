import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';

import { NewApplicationService } from './new-application.service';
import { MockCustomerType, MockGenderList, MockSalutations, MockCitizens, MockCoutryLIst, MockRaceList, MockReligionList, MockMaritalList, MockEmployementList, MockCustomerProfile, MockAddressTypeList, MockStatesList } from '../mock/new-investment-spec.mock';
import { HttpService } from '@cimb/core';

class MockHttpService {
  post() { /* mock */ }
  get()  { /* mock */ }
}

const notFoundMsg = '404 error';


const throwNotFoundError = (error: HttpErrorResponse) => {
  expect(error.error).toBe(notFoundMsg);
  expect(error.status).toBe(404);
}
describe('NewApplicationService', () => {
  let service: NewApplicationService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        NewApplicationService,
        {
          provide: HttpService, useClass: MockHttpService
      }
      ]
    });
    service = TestBed.inject(NewApplicationService);
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCustomertype success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockCustomerType));

    service.getCustomertype().subscribe(data => {
      expect(data).toEqual(MockCustomerType);
      done();
    });

  });

  it('should call getCustomertype error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getCustomertype()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });


  it('should call getTitleSalutations success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockSalutations));

    service.getTitleSalutations().subscribe(data => {
      expect(data).toEqual(MockSalutations);
      done();
    });

  });

  it('should call getTitleSalutations error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getTitleSalutations()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

  it('should call getGenderList success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockGenderList));

    service.getGenderList().subscribe(data => {
      expect(data).toEqual(MockGenderList);
      done();
    });

  });

  it('should call getGenderList error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getGenderList()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });


  it('should call getCountryList success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockCoutryLIst));

    service.getCountryList().subscribe(data => {
      expect(data).toEqual(MockCoutryLIst);
      done();
    });

  });

  it('should call getCountryList error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getCountryList()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

  it('should call getCitizenList success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockCitizens));

    service.getCitizenList().subscribe(data => {
      expect(data).toEqual(MockCitizens);
      done();
    });

  });

  it('should call getCitizenList error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getCitizenList()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

  it('should call getRaceList success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockRaceList));

    service.getRaceList().subscribe(data => {
      expect(data).toEqual(MockRaceList);
      done();
    });

  });

  it('should call getRaceList error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getRaceList()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

  it('should call getCustomerProfile success path', (done) => {

    jest.spyOn(httpService, 'post').mockReturnValue(of(MockCustomerProfile));

    service.getCustomerProfile('12345').subscribe(data => {
      expect(data).toEqual(MockCustomerProfile);
      done();
    });

  });

  it('should call getCustomerProfile error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'post').mockReturnValue(throwError(errorResponse));

    service.getCustomerProfile('12345')
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

  it('should call getReligionList success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockReligionList));

    service.getReligionList().subscribe(data => {
      expect(data).toEqual(MockReligionList);
      done();
    });

  });

  it('should call getReligionList error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getReligionList()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });


  it('should call getMartialStatusList success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockMaritalList));

    service.getMartialStatusList().subscribe(data => {
      expect(data).toEqual(MockMaritalList);
      done();
    });

  });

  it('should call getMartialStatusList error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getMartialStatusList()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

  it('should call getIndustryList success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockEmployementList));

    service.getIndustryList().subscribe(data => {
      expect(data).toEqual(MockEmployementList);
      done();
    });

  });

  it('should call getIndustryList error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getIndustryList()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

  it('should call getOccupationList success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockReligionList));

    service.getOccupationList().subscribe(data => {
      expect(data).toEqual(MockReligionList);
      done();
    });

  });

  it('should call getOccupationList error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getOccupationList()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

  it('should call getAddressTypeList success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockAddressTypeList));

    service.getAddressTypeList().subscribe(data => {
      expect(data).toEqual(MockAddressTypeList);
      done();
    });

  });

  it('should call getAddressTypeList error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getAddressTypeList()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

  it('should call getStatesList success path', (done) => {

    jest.spyOn(httpService, 'get').mockReturnValue(of(MockStatesList));

    service.getStatesList().subscribe(data => {
      expect(data).toEqual(MockStatesList);
      done();
    });

  });

  it('should call getStatesList error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));

    service.getStatesList()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });



  

})
