import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';

import { OrderSummaryApiService } from './order-summary.service';
import { MockOrderSummaryData, MockSendRemainderData } from '../mock/order-summary-spec.mock';
import { HttpService } from '@cimb/core';
import { Environment } from '@cimb/mint-office';

class MockHttpService {
  post() { /* mock */ }
  get()  { /* mock */ }
}
const notFoundMsg = '404 error';

const throwNotFoundError = (error: HttpErrorResponse) => {
  expect(error.error).toBe(notFoundMsg);
  expect(error.status).toBe(404);
}
describe('OrderSummaryApiService', () => {
  let service: OrderSummaryApiService;
  let httpService: HttpService;

  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        OrderSummaryApiService,
        {
          provide: 'environment', useValue: environment,
        },
        {
          provide: HttpService, useClass: MockHttpService
      }
      ]
    });
    service = TestBed.inject(OrderSummaryApiService);
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getOrderSummary success path', (done) => {

    jest.spyOn(httpService, 'post').mockReturnValue(of(MockOrderSummaryData));

    service.getOrderSummary("28").subscribe(data => {
      expect(data).toEqual(MockOrderSummaryData);
      done();
    });

  });

  it('should call getOrderSummary error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'post').mockReturnValue(throwError(errorResponse));

    service.getOrderSummary('28')
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

  it('should call sendingRemainder success path', (done) => {

    jest.spyOn(httpService, 'post').mockReturnValue(of(MockSendRemainderData));

    service.sendingRemainder({trxRefId: '28'}).subscribe(data => {
      expect(data).toEqual(MockSendRemainderData);
      done();
    });

  });

  it('should call sendingRemainder error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404
    });

    jest.spyOn(httpService, 'post').mockReturnValue(throwError(errorResponse));

    service.sendingRemainder({trxRefId: '28'})
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          throwNotFoundError(error);
          done();
        });
  });

})
