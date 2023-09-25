/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { DashboardService } from './dashboard.service';

const mockData = {
  "rmId": "1",
  "year": 2022
}

const mockRmDetails = {
  "rmId": "1",
  "lanId": "1",
  "name": "string",
  "mobileNumber": "123456789",
  "branch": "1",
  "status": "string",
  "createDate": "string"
}
const notFoundMsg = 'Mock 404 error';

const throwNotFoundError = (error: HttpErrorResponse) => {
  expect(error.error).toBe(notFoundMsg);
  expect(error.status).toBe(404);
}
describe('DashboardService', () => {
  let service: DashboardService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DashboardService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTransaction() success path', (done) => {

    jest.spyOn(httpClient, 'post').mockReturnValue(of(
      {
        "rmId": "1",
        "year": 2022
      }
    ));

    service.getTransaction(mockData).subscribe(data =>{
      expect(data).toEqual(mockData);
      done();
    });

  });

  it('should call getTransaction() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: notFoundMsg,
      status: 404
    });

    jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

    service.getTransaction(mockData)
      .subscribe(
        () => { done.fail('') },
        (error) => {
          throwNotFoundError(error)
          done();
        });
  });

  it('should call getRmDetails() success path', (done) => {

    jest.spyOn(httpClient, 'get').mockReturnValue(of(
      {
        "rmId": "1",
        "lanId": "1",
        "name": "string",
        "mobileNumber": "123456789",
        "branch": "1",
        "status": "string",
        "createDate": "string"
      }
    ));

    service.getRmDetail("1").subscribe(data =>{
      expect(data).toEqual(mockRmDetails);
      done();
    });

  });

  it('should call getRmDetails() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: notFoundMsg,
      status: 404
    });

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

    service.getRmDetail("1")
      .subscribe(
        () => { done.fail('') },
        (error) => {
          throwNotFoundError(error)
          done();
        });
  });

})
